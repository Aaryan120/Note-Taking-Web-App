import React, { useEffect, useRef, useState } from 'react'
import { createNote, updateNote } from '../../services/operations/noteAPI'
import useSpeechToText from '../../hooks/useSpeechToText'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { RxCross1 } from 'react-icons/rx'

const NoteModal = ({editForm,setModalData}) => {
    // console.log("PRINTING EDIT FORM",editForm);
    // const [formData,setFormData] = useState({
    //     title: editForm ? editForm.title : '',
    //     description: editForm ? editForm.description : '',
    //     imageUrl: editForm ? editForm.imageUrl : [],
    //     audioUrl: editForm ? editForm.audioUrl : '',
    //     createdAt: editForm ? editForm.noteCreatedAt : '',
    //     updatedAt: editForm ? editForm.updatedAt : '',
    // })
    const [title,setTitle] = useState(editForm ? editForm.title : '');
    // const [description,setDescription] = useState(editForm ? editForm.description : '');
    const [createdAt,setCreatedAt] = useState(editForm ? editForm.noteCreatedAt : '');
    const [updatedAt,setUpdatedAt] = useState(editForm ? editForm.updatedAt : '');
    const [textInput,setTextInput] = useState(editForm ? editForm.description : '');
    const [audioBlob, setAudioBlob] = useState(null);
    const [recording,setRecording] = useState(false);
    const [newImages,setNewImages] = useState([]);
    const [existingImages, setExistingImages] = useState(editForm?.noteImages || []);


    const {token} = useSelector((state) => state.auth);
    const {isListening,startListening,stopListening,transcript} = useSpeechToText({continuous:true});
    const dispatch = useDispatch();
    
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

    const startRecordingAudio = async () =>{
        if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
            try {
                const stream = await navigator.mediaDevices.getUserMedia({audio:true});
                mediaRecorderRef.current = new MediaRecorder(stream);
                mediaRecorderRef.current.ondataavailable = (event) =>{
                    if(event.data && event.data.size > 0){
                        audioChunksRef.current.push(event.data);
                        console.log('Chunk added:', event.data);
                    }
                };
                mediaRecorderRef.current.onstop = () =>{
                    const blob = new Blob(audioChunksRef.current,{type:'audio/webm'});
                    setAudioBlob(blob);
                    audioChunksRef.current = [];
                    console.log('Recording stopped, blob created:', blob);
                }
                mediaRecorderRef.current.start();
                setRecording(true);
                console.log('Recording started');
            } catch (error) {
                console.error("Error starting audio recording: ",error);
            }
        }else{
            alert("Your browser does not support audio recording. ");
        }
    }

    const stopRecordingAudio = () =>{
        if(mediaRecorderRef.current && recording){
            mediaRecorderRef.current.stop();
            setRecording(false);
            console.log('Recording stopped by user');
        }
    }

    const startstopListening =  () =>{
        isListening ? stopVoiceInput() : startListening();
    }

    const stopVoiceInput = () =>{
        setTextInput((prevVal) => prevVal + (transcript.length ? (prevVal.length ? ' ' : '') + transcript : '' ))
        stopListening();
    }
    // const changeHandler = (event) =>{
    //     setFormData((prev) =>({
    //         ...prev,
    //         [event.target.name]: event.target.value,
    //     }))
    // }

    const submitHandler = async (event) =>{
        event.preventDefault();
        if(!token) {
            toast.error("User Invalid");
            return;
        }
        if(!title || !textInput){
            toast.error("Please enter the title and description to process further");
            return;
        }
        const formData = new FormData();
        formData.append("title", title);
        console.log(audioBlob);
        formData.append("description", textInput);
        formData.append("createdAt", createdAt);
        formData.append("updatedAt", Date.now());

        if (audioBlob) {
            formData.append("audio", audioBlob, "recording.webm");
        }

        newImages.forEach((imgObj) => {
            formData.append("imageFile", imgObj.file);
        });
    
        if (editForm) {
            await updateNote({ noteId: editForm._id, formData }, token);
            setModalData(false);
            return;
        }
    
        await createNote(formData, token, dispatch);
        setModalData(false);
        // if(editForm){
        //     if(
        //         formData.description !== textInput
        //     ){
        //         formData.append('description',textInput) = textInput;
        //     }
        //     formData.updatedAt = Date.now();
        //     await updateNote({noteId:editForm._id,formData},token);
        //     setModalData(false)
        //     return;
        // }

        // formData.createdAt = Date.now();
        // formData.updatedAt = Date.now();
        // formData.description = textInput
        // const newdata = await createNote(formData,token,dispatch);
        // console.log("New Data",newdata);

        // setModalData(false);
    }

    const handleImageChange = (event) => {
        const files = Array.from(event.target.files);
        if (existingImages.length + newImages.length + files.length > 5) {
          toast.error("You can only upload up to 5 images.");
          return;
        }
        // For preview, create object URLs. (Alternatively, store the File objects.)
        const filePreviews = files.map((file) => ({
          file,
          preview: URL.createObjectURL(file),
        }));
        setNewImages((prev) => [...prev, ...filePreviews]);
      };

    const removeNewImage = (indexToRemove) => {
        setNewImages((prev) => prev.filter((_, index) => index !== indexToRemove));
    };
    const removeExistingImage = (indexToRemove) =>{
        setExistingImages(prev => prev.filter((_,index) => index !== indexToRemove))
    }
    // console.log("PRINTING TEXT INPUT",textInput)
    // console.log("PRINTING TRANSCRIPT",transcript);
    const mode = editForm ? "edit" : "create"
  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
        <div className="w-full max-w-[550px] rounded-lg border border-zinc-600 bg-white p-6">
            <div className='flex justify-between items-center mb-2'>
                <p className='text-2xl font-semibold'>
                    {
                        mode === "create" ? "Create Note" : "Edit Note"
                    }
                </p>
                <button
                className='text-xl text-black'
                onClick={() =>{
                    setModalData(false);
                }}>
                    <RxCross1 />
                </button>
            </div>
            <div className='w-full mt-2'>
                <form className='flex gap-2 flex-col' onSubmit={(event) => submitHandler(event)}>
                    <label>
                        <p className="text-sm text-richblack-5 mb-[0.2rem]">Title<sup className='text-pink-600'>*</sup></p>
                        <input 
                        value={title}
                        name='title'
                        className='focus:outline-none border w-full border-zinc-400/80 rounded-md p-2 '
                        placeholder='Enter Note Title . . .'
                        onChange={(event) => setTitle(event.target.value)}/>

                    </label>
                    <label>
                        <p className="text-sm text-richblack-5 mb-[0.2rem]">Note (Voice/Text)<sup className='text-pink-600'>*</sup></p>
                        <textarea 
                        value={isListening ? textInput + (transcript.length ? (textInput.length ? ' ' : '') + transcript : '') : textInput}
                        name='description'
                        disabled={isListening}
                        className='focus:outline-none border w-full h-fit border-zinc-400/80 rounded-md p-2 min-h-[100px] '
                        onChange={(event) => {setTextInput(event.target.value)}}/>
                        <div className='mt-2 flex gap-4'>
                            {
                                 !isListening ? 
                                (
                                    <button onClick={(event) =>{
                                        event.preventDefault();
                                        startRecordingAudio();
                                        startstopListening();
                                    }}
                                    className="bg-green-500 text-white px-4 py-2 rounded">
                                        Start Recording
                                    </button>
                                ) :
                                (
                                    <button onClick={(event) =>{
                                        event.preventDefault();
                                        stopRecordingAudio();
                                        startstopListening();
                                    }}
                                    className="bg-red-500 text-white px-4 py-2 rounded">
                                        Stop Recording...
                                    </button>
                                )
                            }
                        </div>

                        <div className="mt-4">
                            <p className="text-sm font-semibold mb-2">Playback Recording:</p>
                            {
                            // If a new recording exists, show it; otherwise, if in edit mode, show the saved audio.
                            audioBlob ? (
                                <audio controls src={URL.createObjectURL(audioBlob)} className="w-full" />
                            ) : editForm?.audioUrl ? (
                                <audio controls src={editForm.audioUrl} className="w-full" />
                            ) : (
                                <p className="text-sm text-gray-500">No audio recording available.</p>
                            )
                            }
                        </div>
                        <label>
                        <p className="text-sm text-richblack-5 mb-[0.2rem]">
                            Upload Images (Max 5)
                        </p>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                        />
                        {/* Image Previews */}
                        <div className="flex flex-wrap gap-2 mt-2">
                {existingImages.map((url, index) => (
                  <div key={index} className="relative">
                    <img
                      src={url}
                      alt={`Existing Upload ${index}`}
                      className="w-40 h-40 object-contain rounded-md border"
                    />
                    <button
                      type="button"
                      onClick={() => removeExistingImage(index)}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-0.5"
                    >
                      <RxCross1 />
                    </button>
                  </div>
                ))}
              </div>
                    {/* New Image Previews */}
                    <div className="flex flex-wrap gap-2 mt-2">
                        {newImages.map((imgObj, index) => (
                        <div key={index} className="relative">
                            <img
                            src={imgObj.preview}
                            alt={`Upload Preview ${index}`}
                            className="w-40 h-40 object-contain rounded-md border"
                            />
                            <button
                            type="button"
                            onClick={() => removeNewImage(index)}
                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-0.5"
                            >
                            <RxCross1 />
                            </button>
                        </div>
                        ))}
                    </div>
                        </label>
                        {/* <button
                        onClick={(event) => {
                            event.preventDefault();
                            startstopListening(); // This toggles listening
                        }}
                        >
                        {isListening ? "Stop Recording..." : "Start Recording"}
                        </button> */}
                    </label>
                    {/* input area here */}
                    <button type="submit" className="bg-purple-500 text-white p-2 rounded mt-4">
                        {mode === "create" ? "Create Note" : "Save Changes"}
                    </button>
                </form>
            </div>

        </div>
    </div>
  )
}

export default NoteModal