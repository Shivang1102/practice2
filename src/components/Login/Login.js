// import React, { useState, useReducer } from "react";

// import Card from "../UI/Card/Card";
// import classes from "./Login.module.css";
// import Button from "../UI/Button/Button";

// const emailReducer = (state, action) => {
//   if (action.type === "USER_INPUT") {
//     return { value: action.val, isValid: action.val.includes("@") };
//   }

//   if (action.type === "INPUT_BLUR") {
//     return { value:state.value, isValid:state.value.includes("@") };
//   }
//   return { value:"", isValid:false };
// };

// const passreducer = (state, action) => {
//   if (action.type === 'USER_INPUT') {
//     return { value: action.val, isValid: action.val.trim().length > 6 };
//   }
//   if (action.type === 'INPUT_BLUR') {
//     return { value: state.value, isValid: state.value.trim().length > 6 };
//   }
//   return { value: '', isValid: false };
// };

// const Login = (props) => {
//   // const [enteredEmail, setEnteredEmail] = useState('');
//   // const [emailIsValid, setEmailIsValid] = useState();
//   // const [enteredPassword, setEnteredPassword] = useState("");
//   // const [passwordIsValid, setPasswordIsValid] = useState();
//   const [formIsValid, setFormIsValid] = useState(false);

//   const [emailstate, dispatchEmail] = useReducer(emailReducer, {
//     value: "",
//     isValid: null
//   });

//   const [passwardstate, dispatchPassward]=useReducer(passreducer,{
//     val:" ",
//     isValid: null
//   });

//   // useEffect(()=>{
//   //    const identifer = setTimeout(() => {
//   //      console.log('checkimg for validate')
//   //     setFormIsValid(
//   //       enteredEmail.includes('@') && enteredPassword.trim().length > 6 && enteredCollege.trim().length>6
//   //       );
//   //    }, 500);

//   //    return()=>{
//   //      console.log('clean up')
//   //     clearTimeout(identifer);
//   //    }

//   // },[enteredEmail, enteredPassword,enteredCollege])

//   const emailChangeHandler = (event) => {
//     dispatchEmail({ type: "USER_INPUT", val:event.target.value });
//     setFormIsValid(
//       event.target.value.includes("@") && passwardstate.isValid
//     );
//   };

//   //  const collegeChangeHandler=(event)=>{
//   //   setEnteredCollege(event.target.validateEmailHandler);
//   //   setFormIsValid(
//   //     enteredEmail.includes('@') && enteredPassword.trim().length > 6 && event.target.value.trim().length>6
//   //     );

//   //  }

//   const passwordChangeHandler = (event) => {
//     dispatchPassward({type:'USER_INPUT', val:event.target.value});
//     setFormIsValid(emailstate.isValid && event.target.value.trim().length > 6);
//   };

//   // const validateCollegeHandler= () => {
//   //   setCollegeIsValid(enteredCollege.trim().length > 6);
//   //  };

//   const validateEmailHandler = () => {
//     // setEmailIsValid(emailstate.isValid);

//     dispatchEmail({ type:"INPUT_BLUR"});
//   };

//   const validatePasswordHandler = () => {
//     // setPasswordIsValid(enteredPassword.trim().length > 6);
//     dispatchPassward({type:'INPUT_BLUR'});
//   };

//   const submitHandler = (event) => {
//     event.preventDefault();
//     props.onLogin(emailstate.value, passwardstate.value);
//   };

//   return (
//     <Card className={classes.login}>
//       <form onSubmit={submitHandler}>
//         <div
//           className={`${classes.control} ${
//             emailstate.isValid === false ? classes.invalid : ""
//           }`}
//         >
//           <label htmlFor="email">E-Mail</label>
//           <input
//             type="email"
//             id="email"
//             value={emailstate.value}
//             onChange={emailChangeHandler}
//             onBlur={validateEmailHandler}
//           />
//         </div>
//         <div
//           className={`${classes.control} ${
//            passwardstate.isValid === false ? classes.invalid : ""
//           }`}
//         >
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             id="password"
//             value={passwardstate.value}
//             onChange={passwordChangeHandler}
//             onBlur={validatePasswordHandler}
//           />
//         </div>
//         {/* <div className={`${classes.control} ${
//             collegeIsValid === false ? classes.invalid : ''
//           }`}>

//            <label htmlFor="college">College Name</label>
//           <input
//             type="name"
//             id="college"
//             value={enteredCollege}
//             onChange={collegeChangeHandler}
//             onBlur={validateCollegeHandler}
//           />
//         </div> */}
//         <div className={classes.actions}>
//           <Button type="submit" className={classes.btn} disabled={!formIsValid}>
//             Login
//           </Button>
//         </div>
//       </form>
//     </Card>
//   );
// };

// export default Login;

import React, { useState, useEffect, useReducer, useContext, useRef } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/auth-context";
import Input from "../UI/Input/Input";

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });
  
  const emailInputRef = useRef();
  const passwardInputRef = useRef();


  const authctx = useContext(AuthContext);
  useEffect(() => {
    console.log("EFFECT RUNNING");

    return () => {
      console.log("EFFECT CLEANUP");
    };
  }, []);

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Checking form validity!");
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);

    return () => {
      console.log("CLEANUP");
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });

    // setFormIsValid(
    //   event.target.value.includes('@') && passwordState.isValid
    // );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });

    // setFormIsValid(emailState.isValid && event.target.value.trim().length > 6);
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if(formIsValid){
       authctx.onLogin(emailState.value, passwordState.value);
    }else if(!emailIsValid){
        emailInputRef.current.focus();
    }else{
      passwardInputRef.current.focus();
    }
 
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
         ref={emailInputRef}
          id="email"
          label="E-mail"
          type="email"
          isValid={emailIsValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
        ref={passwardInputRef}
          id="passward"
          label="Passward "
          type="passward"
          isValid={passwordIsValid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
