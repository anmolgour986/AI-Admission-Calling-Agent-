import { useEffect, useRef, useState } from "react";
import api from "../services/api";
import * as VapiModule from "@vapi-ai/web";
const Vapi = VapiModule.default.default;
console.log(VapiModule);



import StudentInfoCard from "../components/voice/StudentInfoCard";
import TranscriptPanel from "../components/voice/TranscriptPanel";
import CallControls from "../components/voice/CallControls";
import SummaryPanel from "../components/voice/SummaryPanel";

function VoiceAgent() {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  const [callStatus, setCallStatus] = useState("Idle");
  const [transcript, setTranscript] = useState([]);
  const [summary, setSummary] = useState("");
  const [timer, setTimer] = useState(0);

  const vapi = useRef(null);

  useEffect(() => {
  vapi.current = new Vapi(import.meta.env.VITE_VAPI_PUBLIC_KEY);

  fetchNextStudent();

  return () => {
    if (vapi.current) {
      vapi.current.stop();
    }
  };
}, []);



  useEffect(() => {
if (!vapi.current) return;
  vapi.current.on("call-start", () => {
    setCallStatus("Connected");
    setTimer(0);
  });

  vapi.current.on("call-end", () => {
    setCallStatus("Completed");
    setSummary("AI call completed successfully.");
  });

 vapi.current.on("message", (message) => {
  console.log(message);

  if (message.type !== "transcript") return;

  // Sirf FINAL transcript dikhana hai
  if (message.transcriptType !== "final") return;

  const speaker =
    message.role === "assistant" ? "AI" : "You";

  const text = message.transcript?.trim();

  if (!text) return;

  setTranscript((prev) => [
    ...prev,
    {
      speaker,
      message: text,
    },
  ]);
}); 

  return () => {
    if (vapi.current) {
      vapi.current.stop();
    }
  };
}, []);
 

  // Timer
 useEffect(() => {
  let interval;

  if (callStatus === "Connected") {
    interval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
  }

  return () => clearInterval(interval);
}, [callStatus]);



  // Fetch Next Pending Student
  const fetchNextStudent = async () => {
  try {
    setLoading(true);

    const res = await api.get("/students/next");

    console.log("Student Response:", res.data);

    setStudent(res.data.data || null);
  } catch (err) {
    console.log(err.response?.data || err);
    setStudent(null);
  } finally {
    setLoading(false);
  }
};

  // ===========================
  // Start Call
  // ===========================
const startCall = async () => {
  if (!student) return;

  if (!vapi.current) {
    alert("Vapi not initialized");
    return;
  }

  try {
    setTranscript([]);
    setSummary("");

    // Fetch uploaded knowledge
    const res = await api.get("/knowledge/content");

    const knowledge = res.data.knowledge || "No knowledge available.";

    await vapi.current.start(import.meta.env.VITE_VAPI_ASSISTANT_ID);
  } catch (err) {
    console.error(err);
  }
};
  // ===========================
  // End Call
  // ===========================
const endCall = async () => {
  try {
    await vapi.current.stop();

    if (!student) return;

    const payload = {
      status: "Interested",
      summary: `${student.name} is interested in admission.`,
      notes: "AI Call Completed",
      duration: timer,
      transcript,
      sentiment: "Positive",
    };

    await api.put(
      `/students/${student._id}/call-complete`,
      payload
    );

    setSummary(payload.summary);

    setTimeout(() => {
      fetchNextStudent();
      setTranscript([]);
      setSummary("");
      setTimer(0);
      setCallStatus("Idle");
    }, 2000);
  } catch (err) {
    console.error(err);
  }
};
  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-4xl font-bold text-white">
            AI Voice Agent
          </h1>

          <p className="text-slate-400 mt-2">
            Conduct AI-powered admission calls using your Knowledge Base.
          </p>

        </div>

        <div className="bg-green-500/10 border border-green-500/30 px-5 py-3 rounded-xl">

          <span className="text-green-400 font-semibold">
            ● AI Ready
          </span>

        </div>

      </div>

      {loading ? (

        <div className="bg-slate-900 rounded-xl p-10 text-center text-slate-400">
          Loading student...
        </div>

      ) : !student ? (

        <div className="bg-slate-900 rounded-xl p-10 text-center">

          <h2 className="text-2xl font-bold text-white">
            No Pending Students
          </h2>

          <p className="text-slate-400 mt-2">
            Upload students or change a student's status to Pending.
          </p>

        </div>

      ) : (

        <>
          <div className="grid grid-cols-12 gap-6 min-h-[650px]">

            {/* Student Card */}
            <div className="col-span-3">

              <StudentInfoCard
                student={student}
                timer={timer}
                callStatus={callStatus}
              />

            </div>

            {/* Transcript */}
            <div className="col-span-6">

              <TranscriptPanel
                transcript={transcript}
              />

            </div>

            {/* Controls */}
            <div className="col-span-3">

              <CallControls
                callStatus={callStatus}
                timer={timer}
                onStartCall={startCall}
                onEndCall={endCall}
              />

            </div>

          </div>

          {/* Summary */}
          <SummaryPanel
            summary={summary}
          />

        </>

      )}

    </div>
  );
}

export default VoiceAgent;