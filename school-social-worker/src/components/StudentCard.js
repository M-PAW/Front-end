import React, { useState, useEffect } from "react";
import Moment from 'react-moment';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { green } from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';
import Fab from '@material-ui/core/Fab';
import { loadCSS } from 'fg-loadcss';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';
import {useHistory } from 'react-router-dom'

// for material ui card
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import PostAddIcon from '@material-ui/icons/PostAdd';


import { ButtonBox, AddEditBox, CardBox } from './StudentCardStyles';
import { axiosWithAuth } from "../utils/axiosWithAuth";

function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },

    root: {
      width: 345,
      padding: 25,
      margin: 10,
        '& > span': {
          margin: theme.spacing(2),
        },
      },
  }));


export const StudentCard = props => {

  const history = useHistory();

    React.useEffect(() => {
        loadCSS(
          'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
          document.querySelector('#font-awesome-css'),
        );
      }, []);

    const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [snack, setSnack] = useState(false);
  const [updateChild, setUpdateChild] = useState(props.child)
  const [ editing, setEditing ] = useState(false);


  const editToggle = () => {
    setEditing(!editing)
}

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditing(false)
  };

  const handleClicked = () => {
    setSnack(true);
  };

  const handleClosed = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnack(false);
  };

  const onChangeHandler = (e) => {

    setUpdateChild({
      ...updateChild,
      [e.target.name]: e.target.value
    })
  }

  const deleteHandler = id => {
    console.log("deleted!")
    axiosWithAuth()
    .delete(`https://school-social-worker.herokuapp.com/api/students/${id}`)
    .then(res => {
      console.log('this should delete')
      

      axiosWithAuth()
            .get('https://school-social-worker.herokuapp.com/api/students')
            .then(response => {
                props.setStudents(response.data);
                props.setFiltered(response.data)
                editToggle();
            })
            .catch(err => {
                console.log('StudentsListError: ', err)
            })
    })
    .catch(err => {
      console.log(err)
    })
}
  const editHandler = id => {
    console.log("Edited!")
    axiosWithAuth()
    .put(`https://school-social-worker.herokuapp.com/api/students/${id}`, updateChild)
    .then(res => {
      console.log(res.data.updatedStudent)
      console.log(props.students.indexOf(props.child))
      // let index = props.students.indexOf(props.child)

        axiosWithAuth()
            .get('https://school-social-worker.herokuapp.com/api/students')
            .then(response => {
                props.setStudents(response.data);
                props.setFiltered(response.data)
                editToggle();
            })
            .catch(err => {
                console.log('StudentsListError: ', err)
            })

      
    })
    .catch(err => {
      console.log(err)
    })
}

const myId = localStorage.getItem('id');

const postObjectHolder = {
  student_id: props.child.id
}


const addStudentToMyList = () => {
        axiosWithAuth()
        .post(`https://school-social-worker.herokuapp.com/api/users/${myId}/students`, postObjectHolder)
        .then(res => {
            console.log(res)
            history.push('/my-account')
        })
        .catch(err => {
            console.log(err)
        })
}

const testAddVisit = {
  user_id: myId,
  student_id: props.student_id,
  notes: 'this is a test note'
}

const addStudentVisit = () => {
      axiosWithAuth()
      .put(`https://school-social-worker.herokuapp.com/api/visits`, testAddVisit)
      .then(res => {
          console.log(res.data)
          console.log('this should add a note to the students visit')
        })
        .catch(err => {
          console.log(err)
          console.log('this should add a note to the students visit')
      })
}


    return (
        
        <div>
            {/* <CardBox>
                <h3>Name: </h3>
                <p>{props.child.name} <br/>
                Age: {props.child.age}</p>
                <p>Representative: <br/>
                {props.child.child_rep}</p>
                <div>
                <Button variant="contained" onClick={() => handleOpen()}>Expand</Button>
                </div>
            </CardBox> */}

            <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
            <div style={modalStyle} className={classes.paper}>
                <h3 id='simpe-modal-title'>Name: {editing ? <input value={updateChild.name} name="name" onChange={onChangeHandler}/> : props.child.name}</h3>
                <div>
                    <p>Age: {editing ? <input value={updateChild.age} name="age" onChange={onChangeHandler}/>  : props.child.age}</p>
                    
                    <p>Grade: {editing ? <input value={updateChild.grade} name="grade" onChange={onChangeHandler}/> : props.child.grade}</p>
                    {/* Image Here */}
                    <p>Bio: {editing ? <input value={updateChild.bio} name="bio" onChange={onChangeHandler}/> : props.child.bio}</p>
                    <p>Status: {editing ? <input value={updateChild.status} name="status" onChange={onChangeHandler}/> : props.child.status}</p>
                    <p>Insurance Card: {props.child.insurance_card}</p>
                    <p>Card Expiration Date:  
                        <Moment format="YYYY-MM-DD"> 
                        {props.child.expire_date}
                        </Moment>
                    </p>
                    <p>Birth Certificate: {props.child.birth_cert}</p>
                    <p>Special Needs: {editing ? <input value={updateChild.special_needs} name="special_needs" onChange={onChangeHandler}/> : props.child.special_needs}</p>
                    <div>
                        <p>Representative: {editing ? <input value={updateChild.child_rep} name="child_rep" onChange={onChangeHandler}/> : props.child.child_rep}</p>
                        <p>Rep. Phone: {editing ? <input value={updateChild.child_rep_phone} name="child_rep_phone" onChange={onChangeHandler}/> : props.child.child_rep_phone}</p>
                        <p>Rep. Email: {editing ? <input value={updateChild.child_rep_email} name="child_rep_email" onChange={onChangeHandler}/> : props.child.child_rep_email}</p>
                    </div>
                </div>
                <ButtonBox>
                    <AddEditBox>
                    {editing ? 
                    <>
                    <Fab   className={classes.absolute}>
                        <DoneIcon style={{ color: green[500], fontSize: 40}}  onClick={() => editHandler(props.child.id)}/>
                    </Fab>
                    </>
                     : ''}
                      
                        <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={snack}
        autoHideDuration={6000}
        onClose={handleClosed}
        message="Success!"
        action={
          <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClosed}>
              
            </Button>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClosed}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />

                   <Button variant="contained" color="primary" onClick={editToggle} >{!editing ? 'edit' : 'cancel'}</Button>
                    </AddEditBox>
                    {editing ? <Button variant="contained" color="secondary" onClick={() => deleteHandler(props.child.id)}>Delete</Button> : '' }
                    {!editing ? <Fab className={classes.absolute}><PlaylistAddCheckIcon onClick={addStudentToMyList}>Add to My List</PlaylistAddCheckIcon></Fab> : '' }
                    {!editing ? <Fab   className={classes.absolute}><PostAddIcon onClick={addStudentVisit}>add visit</PostAddIcon></Fab> : '' }

                </ButtonBox>
            </div>

  
            </Modal>

            {/* START COMPONENT UI CARD */}
            <Card onClick={() => handleOpen()} className={classes.root}>
              <CardActionArea>
                {/* <CardMedia
                  className={classes.media}
                  image="/static/images/cards/contemplative-reptile.jpg"
                  title="Contemplative Reptile"
                /> */}
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                  {props.child.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                  Grade: {props.child.grade}
                  </Typography>
                </CardContent>
              </CardActionArea>
              {/* <CardActions>
                <Button size="small" color="primary">
                  Share
                </Button>
                <Button size="small" color="primary">
                  Learn More
                </Button>
              </CardActions> */}
            </Card>
            {/* END COMPONENT UI CARD */}

        </div>
    );
}

