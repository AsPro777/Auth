import { Button, Modal, Form } from 'react-bootstrap';
import react, {useState , useRef , useEffect} from "react";
import axios from 'axios';
import Cookies from 'universal-cookie';
import { ReactComponent as Logo } from './Frame_233.svg';
import '../components/settings/Style.css';
import { addClassName } from '@react-leaflet/core';
import { connect } from 'react-redux';
import isElectron from 'is-electron';

export function AuthorizeScreen(props) {
  
    const [show, setShow] = useState(true);
    const [login, setLogin] = useState("");
    const [pwd, setPwd] = useState("");
    const [iserror , setIserror] = useState(0);
    const [serverLogin , setServerLogin] = useState('');
    const [classRol , setClassRol] = useState('');


    useEffect(() => {
      if(window.localStorage.getItem('login')) setClassRol(window.localStorage.getItem('login'));

      const listener = (event,login,pwd) => {
        if (event.code === "Enter" || event.code === "NumpadEnter") {
          event.preventDefault();
          setLogin(document.getElementById("login").value)
          onSubmit();
        }
      };
      document.addEventListener("keydown", listener);
      return () => {
        document.removeEventListener("keydown", listener);
      };
    }, []);


    /*const authorize = () => {
        axios.get(props.network.accountGetUrl).then((resp) => {
          if(resp.response.status === 401){
            window.localStorage.removeItem('login');
            window.localStorage.removeItem('role');
            window.localStorage.removeItem('token');
          }
          })
          .catch((resp) => {
              if(resp.response.status === 401){
                console.log("response 401");
              }else {
                console.log(resp);
              }
          });
      };*/

    const onSubmit = () => { 
        var bodyFormData = new FormData();
        bodyFormData.append('username', document.getElementById("login").value);
        bodyFormData.append('password', document.getElementById("pwd").value);
        
        document.getElementById("login").value = "";
        document.getElementById("pwd").value = "";

        axios({
            method: "post",
            url: props.network.tokenPostUrl,
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" },
          })
            .then(function (response) {
              window.localStorage.setItem('token', response.data.access_token);
              window.localStorage.setItem('login', response.data.username);
              setServerLogin(response.data.username);
              classRole(response.data.username);
              setIserror(0);
            })
            .catch(function (response) {
              setIserror(1);
              //handle error
              console.log('resp='+response);
            });
        //axios.post(tokenUrl)
      };

    const classRole=(param)=>{
      let role='';
          switch (param) {
            case 'admin': { role='adminClass'; /*props.updateRoleUser('adminClass');*/  window.localStorage.setItem('role', 'adminClass'); break; }
            case 'user':  { role='userClass'; /*props.updateRoleUser('userClass');*/ window.localStorage.setItem('role', 'userClass'); break; }
          }
         

          if(isElectron()) { 
            window.ipcRenderer.send( 'update-value' , param);
            window.ipcRenderer.on('qwe', (event, arg) => {
             console.log(arg) ;
            })
         }
    }      
  
    return (
      <>
        {/*<div style={{position: 'absolute',right: '0', display: (classRol) ? 'inline-block' : 'none'}}>
          <button  onClick={()=>{
                             window.localStorage.removeItem("token");
                             window.localStorage.removeItem("login");
                             window.localStorage.removeItem("role");}} 
                             type="button" className="btn btn-primary exitButton" 
                            >Выход
          </button>
          </div>*/}
        <div /*style={{display: (classRol) ? 'none' : 'block' }}*/ className='mainDiv'>
          <div className='divLogo'>
            <Logo className='logo'/>
          </div>
          <div className='inputLogPas'>Введите логин/пароль</div>
          <div>
            <div  className='mainDivLogin'>
              <label className='labelLogin'>Логин:</label>
                <input onChange={e => setLogin(e.target.value)} id='login' name='login' type='text' tabIndex={1} autoFocus  className='inputLogin'/>
            </div>
            <div  className='mainDivPassw'>
              <label  className='labelPassw'>Пароль:</label>
              <div  className='divPassw'>
                <input onChange={e => setPwd(e.target.value)} id='pwd' name='login' type='password' tabIndex={1} autoFocus  className='inputPassw'/>
                <div className='wrongLoginPassw' style={{display: (iserror==0) ? 'none' : 'block'}}>Не верно введен логин/пароль</div>
              </div>
            </div>
            <div  className='mainDivOnSubmit'>
              <button onClick={onSubmit}  className='onSubmit' type='submit' tabIndex={3}>Войти
              </button>                                   
            </div>
          </div>
        </div>
      </>
    );
  }

  const mapStateToProps = (state) => {
    return {
      network: state.engineReducer.network,
      authorize: state.engineReducer.authorize,
      config: state.configReducer,
    };
  };
  export default connect(mapStateToProps)(AuthorizeScreen);