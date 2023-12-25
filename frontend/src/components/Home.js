import React from "react";
import Notes from "./Notes";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import { InView } from "react-intersection-observer";
import { motion } from "framer-motion";

const animationVariants = {
  hidden: { opacity: 0, x: "-100vh" },
  visible: { opacity: 1, x: 0 },
};

const Home = (props) => {
  let navigate = useNavigate();
  const { showAlert } = props;
  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: "-100vh" }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 2 }}
        className=" bg-yellow-900 bg-opacity-60 text-center py-40"
      >
        <h1 className="text-3xl lg:text-5xl text-white font-normal mb-5">
          Organize And Manage Your Thoughts
        </h1>
        <h1 className="text-3xl lg:text-5xl text-white  font-normal mb-10">
          With NoteSync
        </h1>
        <p className="text-1xl lg:text-2xl text-gray-200">
          Remember everything and tackle any project with your notes, tasks, and
          schedule all in one place.
        </p>
        <div className="flex items-center mt-10">
          <button
            className="w-40 px-4 py-2 mx-auto  text-white rounded-lg bg-amber-950 hover:bg-amber-900 focus:outline-none focus:bg-amber-900"
            onClick={() => {
              navigate("/notes");
            }}
          >
            Let's get started
          </button>
        </div>
      </motion.div>

      <div className="font-light">
        <div className="lg:flex mx-4 mt-20 lg:mx-10 lg:mt-44">
          <div className="lg:w-1/2 lg:pl-5 font-light my-auto">
            <h1 className="text-4xl font-normal text-amber-900 text-opacity-80 ">
              <i class="fa-regular fa-clock mr-2"></i> HIT EVERY DEADLINE
            </h1>
            <p className="text-2xl w-2/3 text-justify my-5">
              Create and assign tasks inside your notes with due dates, flags,
              and reminders so nothing falls through the cracks.
            </p>
          </div>
          <div className="lg:w-1/2">
            <img
              src="https://live.staticflickr.com/65535/49266800728_b1b1c2bfbc_b.jpg"
              alt="Deadline Image"
              className="w-full h-80 rounded-md opacity-50 mt-10 lg:mt-0"
            />
          </div>
        </div>

        <InView triggerOnce>
          {({ inView, ref }) => (
            <motion.div
              ref={ref}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={animationVariants}
              transition={{ duration: 2 }}
              className="my-32 lg:my-40 "
            >
              <h1 className="text-4xl font-normal text-center text-amber-900">
                Remember everything. Accomplish anything.
              </h1>
              <p className=" mt-2 text-2xl font-light text-center">
                Evernote stands out to help you stay productive.
              </p>
            </motion.div>
          )}
        </InView>

        <div className="lg:flex mx-4 lg:mx-10 ">
          <div className="lg:w-1/2">
            <img
              src="https://images.squarespace-cdn.com/content/v1/5702725a20c647bc942a75b9/1531331942332-YFELVOMP3YFUVVGOPDO5/StorageQuarters_July.jpg?format=1500w"
              alt="Deadline Image"
              className="w-full h-80 rounded-md opacity-50"
            />
          </div>
          <div className="lg:w-1/2 lg:pl-56   my-auto">
            <h1 className="text-4xl font-normal text-amber-900 text-opacity-80 mt-10 lg:mt-0">
              <i class="fa-solid fa-tablet mr-2"></i> GO PAPERLESS
            </h1>
            <p className="text-2xl w-3/3 text-justify my-5 ">
              Scan important documents and keep them handy on all your devices.
              Save the information—not the clutter.
            </p>
          </div>
        </div>

        <InView triggerOnce>
          {({ inView, ref }) => (
            <motion.div
              ref={ref}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={animationVariants}
              transition={{ duration: 2 }}
              className="my-32 lg:my-40 "
            >
              <h1 className="text-4xl font-normal text-center text-amber-900">
                Get past “getting started”
              </h1>
              <p className=" mt-2 text-2xl font-light text-center">
                Move tasks forward at work, home, and everywhere in between.
              </p>
            </motion.div>
          )}
        </InView>

        <div className="lg:flex mx-4 lg:mx-10 lg:my-40">
          <div className="lg:w-1/2 lg:pl-5 my-auto">
            <h1 className="text-4xl font-normal text-amber-900 text-opacity-80 ">
              <i class="fa-solid fa-rotate mr-4"></i>SAFE AND SYNCED
            </h1>
            <p className="text-2xl w-2/3 text-justify my-5 ">
              Tired of not having the right info handy when you need it?
              Evernote automatically saves notes online and syncs them to all
              your devices.
            </p>
          </div>
          <div className="lg:w-1/2">
            <img
              src="https://www.igeeksblog.com/wp-content/uploads/2022/07/How-to-sync-Notes-from-iPhone-to-Mac-800x450.jpg"
              alt="Deadline Image"
              className="w-full h-80 rounded-md opacity-50 mt-10 lg:mt-0"
            />
          </div>
        </div>
      </div>

      <InView triggerOnce>
        {({ inView, ref }) => (
          <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={animationVariants}
            transition={{ duration: 2 }}
            className="my-20 lg:my-40 "
          >
            <h1 className="text-4xl font-normal text-center text-amber-900">
              Why choose NoteSync?
            </h1>
            <p className=" mt-2 lg:mx-80 text-2xl font-light text-center">
              NoteSync gives you everything you need to keep life
              organized—great note taking, project planning, and easy ways to
              find what you need, when you need it.
            </p>
          </motion.div>
        )}
      </InView>
      <Footer />
    </>
  );
};

export default Home;
