import logo from './logo.svg';
import './App.css';
import { useState ,useEffect
} from 'react';


export default function App() {
  const [users,setUsers]=useState([])
  const [user,setUser]=useState({
    name:"",
    age:""
  })
  const [postuser,setPostuser]=useState([])

  
 const fetchResult=async()=>{
  const response = await fetch("http://localhost:5000/get");
  const data= await response.json();
    console.log(data)
    setUsers(data);
 }

 const postResult=async ()=>{
  const response =  "http://localhost:5000/get/add";
  console.log(user.name);
  await fetch(response, {
    method: 'POST',
    headers:{
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },body: JSON.stringify({
      name:user.name,
      age:user.age
    })
  }).then(()=>{
    console.log(user)
    alert('user added')
  })
}
useEffect(()=>{
const editResult=async (id)=>{
  // const response =  "http://localhost:5000/get/update/"+id;
  // await fetch(response, {
  //   method: 'PUT',
  //   headers:{
  //     'Accept': 'application/json',
  //     'Content-Type': 'application/json',
  //   },body: JSON.stringify({
  //     name:user.name,
  //     age:user.age
  //   })
  // }).then(()=>{
  //   alert('user added')
  // })
  
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id: id, })
    };
    const response = await fetch("http://localhost:5000/get/update/"+id, requestOptions);
    const data = await response.json();
    setPostuser(data.id);
}
editResult();
},[])
const deleteResult=async(id)=>{
  const response = "http://localhost:5000/get/delete/"+id;
  await fetch(response,{
    method: 'DELETE',
    headers:{
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      _id: id,
    })
  }).then(()=>{
    alert('Your product has been deleted!');
  })
}
const handlechange=(event)=>{
  console.log(event.target.value)
  setUser({...user,[event.target.name]:event.target.value});
}
 useEffect(() => fetchResult, []);

  return (
    <div className="App">
      {/* <button onClick={fetchResult}>
        get
      </button> */}
      <form>
  <label>
    Name:
    <input type="text" name="name" value={user.name}  onChange={handlechange} />
  </label>
  <label>Age:
  <input type="text" name="age" value={user.age} onChange={handlechange}/>
  </label>
  <button onClick={postResult}>
        Post
      </button>
</form>
      <table>
        <tr>
          <th>
            name
          </th>
          <th>
            age
          </th>
         
        </tr>
        {users.map((val,key)=>{
          return(
            <tr key={key}>
              <td>{val.name} </td>
              <td>{val.age}</td>
              <td><button onClick={()=>deleteResult(val._id)}>delete</button></td>
              <td><button onClick={()=>editResult(val._id)}>edit</button></td>
            </tr>
          
          )

        })}
        </table>    
    </div>
  );
}

