import React from "react";

const AboutCaliphTools = () => {
  return (
    <section className="my-20">
      <h1 className="text-primary text-4xl font-bold text-center mb-5">
        About Caliph Tools®
      </h1>

      <div className="hero lg:text-left text-center bg-info bg-opacity-10  p-10">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img
            src="https://i.ibb.co/2q1QSjK/yellow-set-tools.jpg"
            className="max-w-sm rounded-lg shadow-2xl"
            alt=""
          />
          <div className="lg:mr-14">
            <h2 className="font-bold text-accent">
              Caliph Tools Manufacturer, L.T.D.
            </h2>
            <h1 className="text-2xl font-bold text-secondary">
              A professional manufacturer and supplier of Hand Tools & Hardware
              Products in Bangladesh.
            </h1>
            <p className="py-6">
              we have expanded our market year by year to where we now have
              customers in many countries around the world. Being honest and
              farsighted, Caliph Tools® is committed to achieving the highest
              standards of service and meeting the needs of international
              businesses through acceptable pricing, controllable quality, and
              reliable delivery.
            </p>
            <button className="btn bg-gradient-to-r from-accent  to-success border-0 text-white block mx-auto lg:mx-0">
              Read More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCaliphTools;
