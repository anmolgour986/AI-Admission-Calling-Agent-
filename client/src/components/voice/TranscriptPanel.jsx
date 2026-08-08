import { useEffect, useRef } from "react";
import {
  FaRobot,
  FaUser,
} from "react-icons/fa";

function TranscriptPanel({ transcript }) {
  const bottomRef = useRef(null);

  // Auto scroll ONLY inside transcript box
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [transcript]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl h-[650px] flex flex-col overflow-hidden">

      {/* Header */}

      <div className="border-b border-slate-800 p-5 shrink-0">
        <h2 className="text-2xl font-bold text-white">
          Live Conversation
        </h2>

        <p className="text-slate-400 mt-1">
          Real-time AI conversation transcript
        </p>
      </div>

      {/* Messages */}

      <div
        className="flex-1 overflow-y-auto p-5 space-y-5"
        id="transcript-container"
      >
        {transcript.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <p className="text-slate-500">
              Waiting for call to start...
            </p>
          </div>
        ) : (
          <>
            {transcript.map((item, index) => (
              <div
                key={index}
                className={`flex ${
                  item.speaker === "AI"
                    ? "justify-start"
                    : "justify-end"
                }`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl p-4 ${
                    item.speaker === "AI"
                      ? "bg-cyan-500/10 border border-cyan-500/30"
                      : "bg-slate-800 border border-slate-700"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {item.speaker === "AI" ? (
                      <FaRobot className="text-cyan-400" />
                    ) : (
                      <FaUser className="text-green-400" />
                    )}

                    <span
                      className={`font-semibold ${
                        item.speaker === "AI"
                          ? "text-cyan-400"
                          : "text-green-400"
                      }`}
                    >
                      {item.speaker}
                    </span>
                  </div>

                  <p className="text-white leading-7 break-words">
                    {item.message}
                  </p>
                </div>
              </div>
            ))}

            {/* Auto Scroll Target */}
            <div ref={bottomRef} />
          </>
        )}
      </div>
    </div>
  );
}

export default TranscriptPanel;