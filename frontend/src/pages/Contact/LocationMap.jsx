const LocationMap = () => {
    return (
      <div className="h-screen w-screen flex flex-col justify-center items-center">
        <h2 className="text-2xl font-semibold mb-4">Our Location</h2>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3105.13895973695!2d-77.0368706846485!3d38.907192279570404!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b7b7b13d22d81b%3A0x5695df0f58b85d14!2sWhite%20House!5e0!3m2!1sen!2sus!4v1609539126539!5m2!1sen!2sus"
          width="100%"
          height="80%"
          allowFullScreen=""
          loading="lazy"
          title="Map"
          className="rounded-lg shadow-sm"
        ></iframe>
      </div>
    );
  };
  
  export default LocationMap;
  