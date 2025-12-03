import '../styles/Contact.css';

const Contact = () => {
  return (
    <section id="contact">
      <div className="contact-container">
        <p className="line-1">I am thrilled to answer <br />
          to your next project.</p>

        <div className="block">

          <a href="mailto:vishnus.connect@gmail.com" className="email">
            vishnus.connect@gmail.com
          </a>

          <a href="" className="resume">
            view resume
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;

