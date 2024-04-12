import { useState } from 'react'
import './index.css'

const NoteItems = (props) => {

    const {notes, onDelete, onEdit} = props
     
    const [clickedId, setClickedId] = useState(null)
    const [showItem, setShowItem] = useState(false)
        
    return( <div className='item-cont'>              
                <div className='show-cont'> 
                    <div> <h3> {notes.title}</h3> </div> 
                    {!showItem ? <div> <img onClick={()=>{setClickedId(notes.id); setShowItem(!showItem)}  }  className='icon' alt='arrow' src='https://res.cloudinary.com/dx94215tz/image/upload/v1712430649/arrow-left_1_ac7gwv.jpg'/> </div>
                                : <div>                                 
                                <img onClick={()=>{onEdit(clickedId)}} className='icon' alt='pencil-icon' src='https://png.pngtree.com/png-vector/20190927/ourmid/pngtree-pencil-icon-png-image_1753753.jpg'/>
                                <img onClick={()=>{onDelete(clickedId)}} className='icon' alt='close-icon' src='data:image/png;base64,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'/>
                                <img onClick={()=>{setClickedId(notes.id); setShowItem(!showItem)}  }  className='icon' alt='arrow' src='https://res.cloudinary.com/dx94215tz/image/upload/v1712430618/arrow-left_1_ob74le.jpg'/> 
                                </div>}
                
                </div>
                {showItem && <div className='full-details-cont'>
                                    <h4> Title: {notes.title}</h4>
                                     <p> Description: {notes.description} </p>
                                   <p> Time: {notes.time}</p>
                            </div>}        
            </div>
    )

}

export default NoteItems


                