import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Contact = () => {
  return (
    <section
      id="contact"
      className="py-24 bg-slate-950"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">
          <p className="text-cyan-400 uppercase tracking-widest font-semibold">
            Contact
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3">
            Get In Touch
          </h2>

          <p className="text-slate-400 mt-5 max-w-2xl mx-auto text-lg">
            Have questions about AdmissionCRM? We'd love to hear from you.
            Reach out to us anytime.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">

          {/* Contact Information */}

          <div className="space-y-6">

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex items-center gap-5 hover:border-cyan-400 transition">

              <div className="bg-cyan-500/20 p-4 rounded-xl">
                <FaEnvelope className="text-cyan-400 text-2xl" />
              </div>

              <div>
                <h3 className="text-white text-xl font-semibold">
                  Email
                </h3>

                <p className="text-slate-400">
                  gourprohit5611@gmail.com
                </p>
              </div>

            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex items-center gap-5 hover:border-cyan-400 transition">

              <div className="bg-cyan-500/20 p-4 rounded-xl">
                <FaPhoneAlt className="text-cyan-400 text-2xl" />
              </div>

              <div>
                <h3 className="text-white text-xl font-semibold">
                  Phone
                </h3>

                <p className="text-slate-400">
                  +91 8082510756
                </p>
              </div>

            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex items-center gap-5 hover:border-cyan-400 transition">

              <div className="bg-cyan-500/20 p-4 rounded-xl">
                <FaMapMarkerAlt className="text-cyan-400 text-2xl" />
              </div>

              <div>
                <h3 className="text-white text-xl font-semibold">
                  Address
                </h3>

                <p className="text-slate-400">
                  Ludhiana, Punjab, India
                </p>
              </div>

            </div>

          </div>

          {/* Contact Form */}

          <form className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-5">

            <input
              type="text"
              placeholder="Your Name"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-5 py-4 text-white outline-none focus:border-cyan-400"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-5 py-4 text-white outline-none focus:border-cyan-400"
            />

            <textarea
              rows="5"
              placeholder="Your Message"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-5 py-4 text-white outline-none focus:border-cyan-400"
            />

            <button
              className="w-full bg-cyan-500 hover:bg-cyan-600 transition py-4 rounded-xl text-white font-semibold"
            >
              Send Message
            </button>

          </form>

        </div>

      </div>
    </section>
  );
};

export default Contact;