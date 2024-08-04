import React, { useEffect, useRef, useState } from 'react'

const Datatable = () => {
    const [formData, setFormData]=useState({name:"", coursename:"",contactnumber:"", joiningdate:"", coursefees:"" })
    const [data, setData]= useState([]);
    const [searchTerm, setSearchTerm]=useState("");
    const [editID, setEditId]= useState(false);
    const outsideClick = useRef(false)
    
    useEffect(()=>{
      if(!editID)return;
      let selectedItem = document.querySelectorAll(`[id='${editID}']`)
      selectedItem[0].focus();
    }, [!editID]);

    useEffect(()=>{
      const handleClickOutside=(event)=>{
        if(outsideClick.current && !outsideClick.current.contains(event.target)){
          setEditId(false);
        }

      };
      document.addEventListener("click", handleClickOutside)

      return()=>{
        document.removeEventListener("click", handleClickOutside);
      }
    },[])

    const handleInputChange=(e)=>{
        setFormData({...formData,[e.target.name]: e.target.value})
         
    }
    const handleAddClick=()=>{
        if(formData.name && formData.contactnumber && formData.joiningdate && formData.coursefees){
            const newItem={
                id:Date.now(),
                name: formData.name,
                coursename: formData.coursename,
                contactnumber: formData.contactnumber,
                joiningdate: formData.joiningdate,
                coursefees: formData.coursefees
            };
            setData([...data, newItem]);
            setFormData({name:"", coursename:"", contactnumber:"", contactnumber:"", joiningdate:"", coursefees:""});
        }

    };
    const handleDelete=(id)=>{
      const updatedList= data.filter((item)=> item.id !== id);
      setData(updatedList);

    }
   const  handleEdit=(id, updatedData)=>{
    if(!editID || editID !== id){
      return
    }
    const updatedList= data.map((item)=>item.id ===id ? {...item, ...updatedData}: item)
    setData(updatedList)
   }

   const handleSearch=(e)=>{
    setSearchTerm(e.target.value);

   };

  return (
    <div className='container'>
        <div className='add-container'>
         <div className='info-container'>
            <input type="Text"
            placeholder="Name"
            name="name"
            value={formData.name} onChange={handleInputChange}/>

            <input type="Text"
            placeholder="Course Name"
            name="coursename"
            value={formData.coursename} 
            onChange={handleInputChange}/>

            <input type="Number"
            placeholder="Enter Your Phome Number"
            name="contactnumber"
            value={formData.contactnumber} 
            onChange={handleInputChange}/>

            <input type="Date"
            placeholder="Enter the student Joining Date"
            name="joiningdate"
            value={formData.joiningdate} 
            onChange={handleInputChange}/>



          <input type="Number"
            placeholder="Enter the course Fees"
            name="coursefees"
            value={formData.coursefees} onChange={handleInputChange}/>

         </div>


         <button className='add' onClick={handleAddClick}>Add</button>
        </div>
      <div className='search-table-container'> 

        <input type="Number"
            placeholder="Search by Name"
            name="name"
            value={searchTerm} onChange={handleSearch}  className='search-input'/>

            <table ref={outsideClick}>

                <thead>
                    <tr>
                        <th>Student Name</th>
                        <th>Course Name</th>
                        <th>Contact Number</th>
                        <th>Joining date</th>
                        <th>Course Fees</th>
                    </tr>
                  
                </thead>

                <tbody>
                  {
                    data.map((item)=>(
                      <tr key={item.id}>
                      <td id={item.id} contentEditable={editID===item.id} onBlur={(e)=> handleEdit(item.id,{name: e.target.innerText})}>{item.name}</td> 
                      <td id={item.id}contentEditable={editID===item.id  } onBlur={(e)=> handleEdit(item.id,{coursename: e.target.innerText})}>{item.coursename}</td> 
                      <td id={item.id}contentEditable={editID===item.id} onBlur={(e)=> handleEdit(item.id,{contactnumber: e.target.innerText})}>{item.contactnumber}</td> 
                      <td id={item.id}contentEditable={editID===item.id}onBlur={(e)=> handleEdit(item.id,{joiningdate: e.target.innerText})}>{item.joiningdate}</td> 
                      <td id={item.id}contentEditable={editID===item.id} onBlur={(e)=> handleEdit(item.id,{coursefees: e.target.innerText})}>{item.coursefees}</td> 
   
                      <td  className='actions'> 
                       <button className='edit' onClick={()=> setEditId(item.id)}>Edit</button>
                       <button className='delete' onClick={()=> handleDelete(item.id)}>Delete</button>
                      </td>
                   </tr>   
                    ))
                  }
                    
                </tbody>
            </table>
            <div className='pagination'></div>
      </div>
    </div>
  )
}

export default Datatable;
