import React from "react";
import { Link } from "react-router-dom";

class AddContact extends React.Component{
    state ={
        name:"",
        email:"", 
    };
    
    

    add = (e)=>{
        e.preventDefault();
        if(this.state.name==="" || this.state.email===""){
            alert("ALL fields are mandatory!");
            return
        }
        this.props.addContactHandler(this.state);
        this.setState({name:"", email:""});
    }
    render(){
        return(
            <div  className = "ui main">
                <h2>Add Contact</h2>
                <form className="ui form" onSubmit = {this.add}>
                    <div className="field">
                    <label>Name</label>
                    <input 
                    type = "text" n
                    ame = "name" 
                    placeholder = "Enter name"
                    value = {this.state.name }
                     onChange ={(e) => this.setState({name: e.target.value})}/>
                        
                        </div>
                        <div className="email">
                    <label>E-mail</label>
                    <input type = "text" 
                    name = "email"
                     placeholder = "Enter valid email"
                     value = {this.state.email }
                     onChange ={(e) => this.setState({email: e.target.value})}/>
                    
                        
                        </div> 
                        <div><button className="ui button blue large" >Add</button></div> 
                        
                        </form>
                        <div>
                           <br></br>
                        </div>

                        <div>
            <Link to="/"><button className = "ui button red left small" >Go back</button></Link>
                     </div>
                        
                
            </div>
        )
    }

}
export default AddContact;