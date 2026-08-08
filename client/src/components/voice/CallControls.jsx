import {
  FaPlay,
  FaPause,
  FaStop,
  FaVolumeMute,
  FaFileAlt,
  FaRobot,
  FaClock,
  FaCircle,
} from "react-icons/fa";

function CallControls({
  callStatus,
  timer,
  onStartCall,
  onEndCall,
}) {
  const formatTime = (seconds) => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");

    return `${mins}:${secs}`;
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 h-full flex flex-col">

      {/* Heading */}

      <h2 className="text-2xl font-bold text-white mb-6">
        AI Controls
      </h2>

      {/* AI Status */}

      <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 mb-5">

        <div className="flex items-center gap-2">

          <FaCircle className="text-green-400 text-xs animate-pulse" />

          <span className="text-green-400 font-semibold">
            AI Ready
          </span>

        </div>

      </div>

      {/* AI Model */}

      <div className="bg-slate-800 rounded-xl p-4 mb-4">

        <div className="flex items-center gap-3">

          <FaRobot className="text-cyan-400 text-xl" />

          <div>

            <p className="text-slate-400 text-sm">
              AI Model
            </p>

            <p className="text-white font-semibold">
              Llama 3.2
            </p>

          </div>

        </div>

      </div>

      {/* Call Status */}

      <div className="bg-slate-800 rounded-xl p-4 mb-4">

        <div className="flex items-center gap-3">

          <FaCircle
            className={`text-xs ${
              callStatus === "Connected"
                ? "text-green-400"
                : callStatus === "Completed"
                ? "text-red-400"
                : "text-yellow-400"
            }`}
          />

          <div>

            <p className="text-slate-400 text-sm">
              Call Status
            </p>

            <p className="text-white font-semibold">
              {callStatus}
            </p>

          </div>

        </div>

      </div>

      {/* Timer */}

      <div className="bg-slate-800 rounded-xl p-4 mb-8">

        <div className="flex items-center gap-3">

          <FaClock className="text-cyan-400 text-xl" />

          <div>

            <p className="text-slate-400 text-sm">
              Call Timer
            </p>

            <p className="text-white text-2xl font-bold">
              {formatTime(timer)}
            </p>

          </div>

        </div>

      </div>

      {/* Buttons */}

      <div className="space-y-4">

        <button
          onClick={onStartCall}
          disabled={callStatus === "Connected"}
          className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white py-3 rounded-xl font-semibold flex justify-center items-center gap-3 transition"
        >
          <FaPlay />
          Start Call
        </button>

        <button
          disabled
          className="w-full bg-yellow-500 opacity-50 text-black py-3 rounded-xl font-semibold flex justify-center items-center gap-3"
        >
          <FaPause />
          Pause
        </button>

        <button
          disabled
          className="w-full bg-slate-700 opacity-50 text-white py-3 rounded-xl font-semibold flex justify-center items-center gap-3"
        >
          <FaVolumeMute />
          Mute
        </button>

        <button
          onClick={onEndCall}
          disabled={callStatus !== "Connected"}
          className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white py-3 rounded-xl font-semibold flex justify-center items-center gap-3 transition"
        >
          <FaStop />
          End Call
        </button>

      </div>

      <div className="flex-1"></div>

      <button
        disabled
        className="w-full bg-cyan-500 opacity-50 text-white py-3 rounded-xl font-semibold flex justify-center items-center gap-3"
      >
        <FaFileAlt />
        Generate Summary
      </button>

    </div>
  );
}

export default CallControls;