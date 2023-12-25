import React from "react";
import Footer from "./Footer";
import { InView } from "react-intersection-observer";
import { motion } from "framer-motion";

const animationVariants = {
  hidden: { opacity: 0, x: "-100vh" },
  visible: { opacity: 1, x: 0 },
};

function About() {
  return (
    <>
      <InView triggerOnce>
        {({ inView, ref }) => (
          <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={animationVariants}
            transition={{ duration: 2 }}
            className="my-20 lg:my-20 "
          >
            <h1 className="text-4xl font-normal text-center text-amber-900">
              GET IN TOUCH
            </h1>
          </motion.div>
        )}
      </InView>

      <section className="bg-yellow-900 bg-opacity-60">
        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-white ">
            Contact Us
          </h2>
          <p class="mb-8 lg:mb-16 font-light text-center text-gray-200 sm:text-xl">
            Got a technical issue? Want to send feedback about a beta feature?
            Need details about our Business plan? Let us know.
          </p>
          <form action="#" className="space-y-8">
            <div>
              <label
                for="email"
                className="block mb-2 text-sm font-medium text-gray-200"
              >
                Your email
              </label>
              <input
                type="email"
                id="email"
                className="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:placeholder-gray-400 dark:text-white dark:shadow-sm-light"
                placeholder="name@flowbite.com"
              />
            </div>
            <div>
              <label
                for="subject"
                className="block mb-2 text-sm font-medium text-gray-200"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm dark:placeholder-gray-400 dark:text-white dark:shadow-sm-light"
                placeholder="Let us know how we can help you"
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label
                for="message"
                className="block mb-2 text-sm font-medium text-gray-200"
              >
                Your message
              </label>
              <textarea
                id="message"
                rows="6"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 dark:placeholder-gray-400 dark:text-white"
                placeholder="Leave a comment..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Send message
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default About;
