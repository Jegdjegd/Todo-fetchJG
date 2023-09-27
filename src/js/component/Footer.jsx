import React from "react";
import "../../styles/index.css"

const Footer = ({counter,removeAll}) => {


    return (
      <>          
      <div className="d-flex row justify-content-between">
        <div className="footer col-auto">
          <p>{counter} item(s) left</p>
        </div>
      
        <div className="col-auto mb-2 mx-2">
         
        <button 
          type="button" 
          className="btn btn-danger rounded my-2 mr-1 "
          onClick={()=>{
            removeAll();
            window.location.reload(true);
          }}
          >Delete All
        </button>
        </div>
      </div>      
      </>
  );
};

export default Footer;
