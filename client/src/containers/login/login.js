import React from 'react'
import "./login.scss"
import { login,removeMsg } from '@/redux/actions.js'
import { connect } from 'react-redux'
import { Alert } from 'antd';
@connect(
  state=>state,
  {login,removeMsg}
)
class Login extends React.Component {
  constructor(props){
    super(props)
    this.state={
      username:'',
      password:'',
      re_username:'',
      repet_password:'',
    }
    console.log(this.props)
  }

  // 表单信息
  handleChange=(key,event)=>{
    this.setState({
      [key]:event.target.value
    })
    console.log(this.state)
  }
  // 登录
  login=()=>{
    this.props.login(this.state)
  }
  // 注册
  register=()=>{
    console.log(this.state)
  }

  // 关闭提示
  handleErrorClose=()=>{
    this.props.removeMsg()
  }

  classCal=(dom,what,className)=>{
    switch (what) {
      case 'add':
        dom.classList.add(className)
        break
      case 'remove':
        dom.classList.remove(className)
        break
      default:
        break
    }
  }

  inputFocus =(e)=>{
    const inputNow =e.target
    const go =this.refs.go
    inputNow.parentNode.classList.add('focus')
    inputNow.parentNode.classList.remove('shake')
    go.classList.remove('active')
  }

  inputBlur =(e)=>{
    const inputNow =e.target
    if(!inputNow.value) {
      inputNow.parentNode.classList.remove('focus')
    }else{
      inputNow.parentNode.classList.add('focus')
    }
  }
  // 切换到注册
  changeRegister=(e)=>{
    e.preventDefault()
    const formBox =this.formBox
    formBox.classList.remove('level-reg-revers')
    if(formBox.classList.contains('level-login')){
      this.classCal(formBox,'remove','level-login')
    }else{
      this.classCal(formBox,'add','level-login')
    }
    if(formBox.classList.contains('level-reg')){
      this.classCal(formBox,'remove','level-reg')
    }else{
      this.classCal(formBox,'add','level-reg')
    }
    if(!formBox.classList.contains('level-reg')){
      this.classCal(formBox,'add','level-reg-revers')
    }
  }
  //忘记密码
  forgetPass=(e)=>{
    e.preventDefault()
    const formBox =this.formBox
    this.classCal(formBox,'add','level-forget')
    this.classCal(formBox,'remove','level-reg')
  }

  handleBack=(e)=>{
    e.preventDefault()
    const formBox =this.formBox
    this.classCal(formBox,'remove','level-forget')
    this.classCal(formBox,'add','level-login')
  }




  render() {
    return (
      <div className="login-container">
      {this.props.userstatus.msg?
      <Alert
        description={this.props.userstatus.msg}
        type="error"
        showIcon
        className="errorMsg"
        closable
        afterClose={this.handleErrorClose}
      />:null}
        <div className="formBox level-login" ref={(div)=>this.formBox=div}>
          <div className="box boxShaddow"></div>
          <div className="box loginBox">
            <h2>登录</h2>
            <form className="form">
              <div className="f_row" >
                <label>用户名</label>
                <input type="text" className="input-field" value={this.state.username} onChange={this.handleChange.bind(this,'username')}  onFocus={this.inputFocus} onBlur={this.inputBlur} required/>
                <u></u>
              </div>
              <div className="f_row last">
                <label>密码</label>
                <input type="password" className="input-field" onFocus={this.inputFocus} onBlur={this.inputBlur} onChange={this.handleChange.bind(this,'password')} required/>
                <u></u>
              </div>
              <button type="button" className="btn" ref="go" onClick={this.login}><span>GO</span> <u></u>
                <svg version="1.1"  x="0px" y="0px" viewBox="0 0 415.582 415.582" >
                  <path d="M411.47,96.426l-46.319-46.32c-5.482-5.482-14.371-5.482-19.853,0L152.348,243.058l-82.066-82.064
                        c-5.48-5.482-14.37-5.482-19.851,0l-46.319,46.32c-5.482,5.481-5.482,14.37,0,19.852l138.311,138.31
                        c2.741,2.742,6.334,4.112,9.926,4.112c3.593,0,7.186-1.37,9.926-4.112L411.47,116.277c2.633-2.632,4.111-6.203,4.111-9.925
                        C415.582,102.628,414.103,99.059,411.47,96.426z"/>
                </svg>
              </button>
              <div className="f_link">
                <a href="" className="resetTag" onClick={this.forgetPass}>忘记密码?</a>
              </div>
            </form>
          </div>
          <div className="box forgetbox">
            <a href="" className="back icon-back" onClick={this.handleBack}>
            <svg version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 199.404 199.404"
        >
          <polygon points="199.404,81.529 74.742,81.529 127.987,28.285 99.701,0 0,99.702 99.701,199.404 127.987,171.119 74.742,117.876 199.404,117.876 "/>
          </svg>
            </a>
            <h2>重置密码</h2>
            <form className="form">
              <p>请在输入邮箱后打开邮件</p>
              <div className="f_row last">
                <label>请输入邮箱</label>
                <input type="text" className="input-field" required onFocus={this.inputFocus} onBlur={this.inputBlur}/>
                <u></u>
              </div>
              <button type="button" className="btn"><span>重置密码</span><u></u>
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px" viewBox="0 0 415.582 415.582" >
                  <path d="M411.47,96.426l-46.319-46.32c-5.482-5.482-14.371-5.482-19.853,0L152.348,243.058l-82.066-82.064
                      c-5.48-5.482-14.37-5.482-19.851,0l-46.319,46.32c-5.482,5.481-5.482,14.37,0,19.852l138.311,138.31
                      c2.741,2.742,6.334,4.112,9.926,4.112c3.593,0,7.186-1.37,9.926-4.112L411.47,116.277c2.633-2.632,4.111-6.203,4.111-9.925
                      C415.582,102.628,414.103,99.059,411.47,96.426z"/>
                </svg>
              </button>
            </form>
          </div>
          <div className="box registerBox">
            <span className="reg_bg"></span>
            <h2>注册</h2>
            <form className="form">
              <div className="f_row">
                <label>邮箱</label>
                <input type="text" className="input-field" required  onFocus={this.inputFocus} onBlur={this.inputBlur} onChange={this.handleChange.bind(this,'re_username')}/>
                <u></u>
              </div>
              <div className="f_row">
                <label>密码</label>
                <input type="password" className="input-field" required  onFocus={this.inputFocus} onBlur={this.inputBlur} onChange={this.handleChange.bind(this,'re_password')}/>
                <u></u>
              </div>
              <div className="f_row last">
                <label> 再次输入密码</label>
                <input type="password" className="input-field" required  onFocus={this.inputFocus} onBlur={this.inputBlur} onChange={this.handleChange.bind(this,'repet_password')}/>
                <u></u>
              </div>
              <button type="button"  className="btn-large" onClick={this.register}> NEXT</button>
            </form>
          </div>
          <a href="" className="regTag icon-add" onClick={this.changeRegister}>
            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 357 357" >
              <path d="M357,204H204v153h-51V204H0v-51h153V0h51v153h153V204z"/>
            </svg>
          </a>
        </div>
      </div>
    )
  }
}
export default Login
