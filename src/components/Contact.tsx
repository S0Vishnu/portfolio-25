import '../styles/Contact.css';

const Contact = () => {
  return (
    <section id="contact">
      <h2>Contact</h2>
      <form className="form-container">
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="message" className="form-label">
            Message:
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            className="form-input"
          />
        </div>
        <button type="submit" className="form-button">
          Send Message
        </button>
      </form>
    </section>
  );
};

export default Contact;

