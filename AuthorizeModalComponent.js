import { Button, Modal, Form } from 'react-bootstrap';
import react, {useState} from "react";
import axios from 'axios';
import Cookies from 'universal-cookie';
import { ReactComponent as Logo } from '../screens/Frame_233.svg';

export function AuthorizeModalComponent(props) {
    const [show, setShow] = useState(props.isShow);
    const [login, setLogin] = useState("");
    const [pwd, setPwd] = useState("");
    const [iserror , setIserror] = useState(0);
    /*const [classRole , setClassRole] = useState('');*/

    const cookies = new Cookies();
  
    const handleClose = () => {setShow(false);}
    const handleShow = () => setShow(true);

    /*const authorize = () => {
        axios.get(this.props.network.accountGetUrl).then((resp) => {
            this.setState({authorize: true});
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
        bodyFormData.append('username', login);
        bodyFormData.append('password', pwd);
        axios({
            method: "post",
            url: props.tokenUrl,
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" },
          })
            .then(function (response) {
              window.localStorage.setItem('token', response.data.access_token);
              window.localStorage.setItem('login', response.data.username);
              //handle success
              handleClose();
              props.updateAuthoriz();
              classRole(response.data.role);
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
          switch (param) {
            case 'admin': { props.updateRoleUser('adminClass'); window.localStorage.setItem('role', 'adminClass'); break; }
            case 'user':  { props.updateRoleUser('userClass'); window.localStorage.setItem('role', 'userClass'); break; }
          }
    }      
  
    return (
        <div style={{display: (show==false ? 'none' : 'block') ,width: '100%',maxWidth: '784px', margin: '0 auto', marginTop: '10vh'}}>
          <div style={{width: '100%',position: 'relative',height: '150px', marginTop: '18%'}}>
            <Logo style={{margin: '0',  marginTop: '0px',position: 'absolute',top: '50%',width: '100%',transform: 'translate(0,-50%) scale(0.25)',marginTop: '-100px'}}/>
          </div>
          <div style={{fontSize: '30px', fontWeight: '300',textAlign: 'center', color: 'white',marginTop: '-80px', fontFamily:'Roboto',fontStyle: 'normal'}}>Введите логин/пароль</div>
          <div>
            <div style={{  marginTop: '20px',  width: '400px',  height: '42px',  position: 'relative',  marginLeft: '200px'}}>
              <label style={{color: 'white',lineHeight: '42px',fontSize: '18px',fontWeight: '300',fontFamily: 'Roboto',fontStyle: 'normal'}}>Логин:</label>
                <input onChange={e => setLogin(e.target.value)} id='login' name='login' type='text' tabIndex={1} autoFocus style={{color: 'gray', backgroundColor: 'gray',color: '#5D5C5C !important',float: 'right',fontFamily: 'Roboto',borderRadius: '3px',width: '275px',height: '42px',fontSize: '14px',paddingLeft: '10px',boxSizing: 'border-box',border: '1px solid #DBE3E4'}}/>
            </div>
            <div style={{  marginTop: '20px',  width: '700px',  height: '42px',  position: 'relative',  marginLeft: '200px',display: 'flex',flexDirection: 'row'}}>
              <label style={{color: 'white',lineHeight: '42px',fontSize: '18px',fontWeight: '300',fontFamily: 'Roboto',fontStyle: 'normal'}}>Пароль:</label>
              <div style={{float: 'right',width: '100%',display: 'flex',flexDirection: 'row', marginLeft: '69px'}}>
                <input onChange={e => setPwd(e.target.value)} id='login' name='login' type='password' tabIndex={1} autoFocus style={{color: 'gray', marginLeft: '-10px',backgroundColor: 'gray',color: '#5D5C5C !important',float: 'right',fontFamily: 'Roboto',borderRadius: '3px',width: '275px',height: '42px',fontSize: '14px',paddingLeft: '10px',boxSizing: 'border-box',border: '1px solid #DBE3E4'}}/>
                <div style={{width: '200px', height: '43px',textAlign: 'left',paddingTop: '10px',color: 'red',fontFamily: 'Roboto',fontSize: '13px',fontWeight: 'normal',fontStyle: 'normal', marginLeft: '20px', display: (iserror==0) ? 'none' : 'block'}}>Не верно введен логин/пароль</div>
              </div>
            </div>
            <div style={{  marginTop: '20px',  textAlign: 'center'}}>
              <button onClick={onSubmit} style={{width: '100%',maxWidth: '275px',height: '38px',lineHeight: '38px',color: '#fff',textTransform: 'uppercase',fontWeight: '600',fontSize: '13px',textAlign: 'center',marginLeft: '143px',
                                         fontFamily: 'Roboto', cursor: 'pointer' ,borderRadius: '3px',cursor: 'pointer',backgroundColor: '#38bc9c',border: 'none'}} type='submit' tabIndex={3}>Войти
              </button>                                           
            </div>
          </div>
        </div>
      
    );
  }
