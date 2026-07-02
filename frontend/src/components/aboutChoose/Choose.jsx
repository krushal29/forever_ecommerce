import "../aboutChoose/Choose.css";

const Choose = () => {
  return (
    <>
    <div className="choose1">
      <div className="choose">
        <h2>
          <span>WHY</span>CHOOSE US
        </h2>
        <p className="line"></p>
      </div>
    </div>

      <div className="chooseCard">
        <div className="chooseCard1">
          <div className="Quality">
            <div className="CardH4">
              <h4>Quality Assurance:</h4>
            </div>
            <div className="CardP">
              <p>
                We meticulously select and vet each product to ensure it meets
                our stringent quality standards.
              </p>
            </div>
          </div>


          <div className="Convenience">
            <div className="CardH4">
              <h4>Convenience:</h4>
            </div>
            <div className="CardP">
              <p>
              With our user-friendly interface and hassle-free ordering process, shopping has never been easier.
              </p>
            </div>
          </div>


          <div className="Exceptional">
            <div className="CardH4">
              <h4>Exceptional Customer Service:</h4>
            </div>
            <div className="CardP">
              <p>
              Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Choose;
