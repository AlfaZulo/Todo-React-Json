import{Component} from "react";
import axios from "axios";
import "./todo.css"

class Todo extends Component{
    constructor(props){
        super(props);
        this.state={
            task:"",
            todos:[],
            id: 0

        }
    }

    //Read opaeration
    componentDidMount(){
        axios.get('http://localhost:5000/todos').then((result)=>{
            this.setState({
                todos: result.data
            })
        })

    }
    
    handleTask=(event)=>{
        this.setState({
            task:event.target.value
        })
        console.log(this.state.task)
    }
    // Create and update operation
    addTask = (event, id) => {
        event.preventDefault();

        if (this.state.id === 0) {
            axios.post('http://localhost:5000/todos', {               
                task: this.state.task
            }).then(() => {
                this.componentDidMount()
            })
        } // Actual update functionality
        else {
            axios.put(`http://localhost:5000/todos/${id}`, {
             task: this.state.task
            }).then(() => {
                this.componentDidMount()
            })
        }
    }
    // Delete operation
        deleteTodos = (event, id) => {
            axios.delete(`http://localhost:5000/todos/${id}`).then(() => {
                this.componentDidMount();
            })
        }

    //Taking data 
        updateTodos = (event, id) => {
            axios.get(`http://localhost:5000/todos/${id}`).then(result => {
                this.setState({
                    task:result.data.task,
                    id: result.data.id

                })
            })
        }

    render(){
        return(
            <div className="container">
               <form     autoComplete="off" onSubmit={(e) => { this.addTask(e, this.state.id) }}>
                    <div>
                        <label> 
                            <h1>TODOS</h1>
                        </label>                       
                    </div>
                    <div className="tasks">
                        <input type="text" placeholder="TASK" name="task" value={this.state.task} onChange={this.handleTask} required />
                        </div>
                        <div className="submit">
                    <input type="submit" className={this.state.id === 0 ? 'btn btn-primary' : 'btn btn-success'} value={this.state.id === 0 ? 'Add' : 'Update'} />
                    </div>
                </form>
                <hr/>
                <table className="table">
                <thead>
                    <th><h3>Tasks TODO</h3></th>
                </thead>
                <tbody>
                        {
                            this.state.todos.map((todos, index) => (
                                <tr key={index}>
                                    <td>
                                        <h4>{todos.task}</h4>                                        
                                        <span> <button onClick={(e) => this.deleteTodos(e, todos.id)} className="btn btn-danger btn-sm">Delete</button></span>
                                        <span> <button onClick={(e) => this.updateTodos(e, todos.id)} className="btn btn-success btn-sm">Update</button></span>
                                    </td>
                                   </tr>
                            ))
                        }
                    </tbody>
                </table>

            </div>
        )
    }
}

export default Todo;