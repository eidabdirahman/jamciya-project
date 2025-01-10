import homeImage from '../../../public/2.jpeg';
const Mainhome = () => {
  return (
    <div>
    <div
    style={{
      backgroundImage: `url(${homeImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: "50vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "white",
      textAlign: "center",
      position: "relative",
    }}
  >
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.7)", // Adjust the opacity as needed
        color: "white",
        zIndex: 1,
      }}
    />
    <div style={{ zIndex: 2 }}>
      {/* Your content here */}  <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold">Welcome to AgriAid</h1>
        <p className="mt-4 text-xl">
          Your gateway to agricultural knowledge and resources.
        </p>
      </div>
    </div>

  </div>
      
    </div>
  )
}

export default Mainhome
