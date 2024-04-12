import {useReducer} from 'react'
import NoteItems from '../NoteItems'
import {v4 as uuid} from 'uuid'
import './index.css'

const Home = () => {
     

    

    const updateNotes = (state, action) => {
        switch(action.type){
            case 'showHideAddNoteButton':
                return {...state, showAddNoteButton: action.payload}
            case 'addClicked':
                return {...state, showAddNoteButton: action.payload}
            case 'cancelClicked':                
                {return {...state, showAddNoteButton: action.payload, title: '', description:'', imgLink: ''}}
            case 'titleEntered':
                return {...state, title: action.payload}
            case 'descriptionEntred':
                return{...state, description: action.payload}
            case 'linkEntered':
                return{...state, imgLink: action.payload}             
            case 'searchItems':
                return{...state, searchList: action.payload.searchList, searchText: action.payload.searchText}
            case 'onDelete':
                return {...state, notesList: action.payload}
            case 'onEdit':
                return {...state, editId: action.payload.editId, isNewOne: action.payload.isNewOne, title: action.payload.title, imgLink: action.payload.imgLink, description: action.payload.description, showAddNoteButton: action.payload.showAddNoteButton }
            case 'onEditUpdate':
                return{...state, showAddNoteButton: action.payload.showAddNoteButton ,editId: action.payload.editId, notesList: action.payload.notesList, title: action.payload.title,  isNewOne:action.payload.isNewOne, description: action.payload.description}
                case 'onSubmit':
                return {...state, title: action.payload.title, description: action.payload.description, showAddNoteButton: action.payload.showAddNoteButton, notesList:[...state.notesList, action.payload.newItem]}
            default:
                return state
        }

    }
       
    
    const [state, dispatch] = useReducer(updateNotes, {
        title: '', 
        description: '', 
        imgLink: '', 
        searchText: '', 
        searchList: [],  
        showAddNoteButton: false, 
        editId: null, 
        addClicked: '', 
        cancelClicked: '', 
        newItem: '', 
        isNewOne: false, 
        notesList: []})
    
    
    const handleForm = (event) => {
        event.preventDefault();       
        let now = new Date();
        let year = now.getFullYear();
        let month = now.getMonth() + 1;
        let day = now.getDate();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        let finalDate = `${day}/${month}/${year} ${hours}:${minutes}`

        if (!state.isNewOne){
            if(state.title !== '' && state.description !== ''){
                const newItem = { id: uuid(), title: state.title, description: state.description, imgLink: state.imgLink, time: finalDate}
                dispatch({type:'onSubmit', payload:{title:'' , imgLink:'',description: '', showAddNoteButton: false, newItem: newItem} })
    
            }
        }     
    }

    const onDelete = (id) =>{
        const updatedList = state.notesList.filter(eachNote=> eachNote.id !== id)
        dispatch({type: 'onDelete', payload: updatedList})

    }

    const onEdit = (id) =>{
        const editingItem = state.notesList.filter(eachNote=> eachNote.id===id)
        dispatch({type:'onEdit', payload:{editId: id, showAddNoteButton: !state.showAddNoteButton, title: editingItem[0].title, description: editingItem[0].description, imgLink: editingItem[0].imgLink, isNewOne: true } })

    }

    
    const onEditUpdate = () => {
        const editingItem = state.notesList.map(eachNote=> {
            
            if ( eachNote.id===state.editId){
                const newItem =  {
                    time: eachNote.time,
                    id: eachNote.id = state.editId,
                   title: eachNote.title = state.title,
                    description: eachNote.description = state.description,
                   imgLink: eachNote.imgLink =state.imgLink
                   }
                return newItem
            }
            else {
                return eachNote
            }
        })
    
        dispatch({type: 'onEditUpdate', payload:{ showAddNoteButton: !state.showAddNoteButton  , editId: null, notesList: editingItem, isNewOne: false, title: '', description: '', imgLink:'' }})

    }
    

    
    
    return(
        <div className='home-cont'>   
                 <h1> Your Notes</h1>       

                <div> 
                 
                    <input
                    type='search'
                    onChange={(e) => {
                        const searchText = e.target.value.toLowerCase();
                        if (searchText.length !== 0){
                            let searchList = state.notesList.filter(eachNote => eachNote.title.toLowerCase().includes(searchText));
                        dispatch({ type: 'searchItems', payload: { searchText, searchList } });
                        }
                        else{
                            dispatch({ type: 'searchItems', payload: { searchText, notesList: state.notesList}});
                        }
                        
                    }}
                    placeholder='Search your title..'
                /> 
                

                 
                </div>              
                   
                

                {state.showAddNoteButton ?  <form onSubmit={handleForm}> <div className='input-fields'> 
                 
                <div> 
                    <label htmlFor='title'> Title *</label> <br/>
                    <input id='title' type='text' value={state.title} onChange={(e)=>{dispatch({type: 'titleEntered', payload: e.target.value})}} /> 
                </div>

                <div> 
                    <label htmlFor='description'> Description * </label> <br/>
                    <textarea value={state.description} onChange={(e)=>{dispatch({type: 'descriptionEntred', payload: e.target.value})}} id='description' rows='5' cols='50' placeholder='Write your description here..'/>
                </div>

                <div>
                    <label htmlFor='media'> Image/Video link </label> <br/>
                    <input value={state.imgLink} type='text' id='media' onChange={(e)=>{dispatch({type:'linkEntered', payload: e.target.value})}}/>
                </div>

                {!state.isNewOne ? <div className='btn-cont'>
                 <input type='submit' value='Add'  className='add-note-btn'/>
                 <input type='button' value='Cancel'   className='add-note-btn' onClick={()=> dispatch({type:'cancelClicked', payload: !state.showAddNoteButton })} />
                </div> : <div className='btn-cont'> < button onClick={onEditUpdate} className='add-note-btn'> Update </button>  </div> }

            </div>
                </form> : 
                <div className='add-note-cont'> 
                <button onClick={()=>dispatch({type:'showHideAddNoteButton', payload: !state.showAddNoteButton })} className='add-note-btn'> Add Note </button> 
            </div> }
            { state.searchText==='' ?<> {state.notesList.map(eachNote=><NoteItems key={eachNote} notes={eachNote} onDelete={onDelete} onEdit={onEdit} />)} </>
            : <> {state.searchList.map(eachNote=><NoteItems key={eachNote} notes={eachNote} onDelete={onDelete} onEdit={onEdit} />)} </> } 
            
            
            
        </div>
    )
}

export default Home