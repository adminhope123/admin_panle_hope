import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import './employeePage.css'
// @mui
import { Box, Container, Stack, Tab, Tabs, tabsClasses, Typography,Button, Modal, FormControl, TextField,Card, CardContent } from '@mui/material';
// components
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
// mock
import PRODUCTS from '../_mock/products';
import { useDispatch, useSelector } from 'react-redux';
import { addFiledPostApi, deletePostApi, getEmployeeApi, getFiledPostApi } from 'src/Redux/actions';
import AddIcon from '@mui/icons-material/Add';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import styled from '@emotion/styled';

// ----------------------------------------------------------------------
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius:"12px",
  p: 4,
};
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));


export default function AllStaffMembers() {
  const [openFilter, setOpenFilter] = useState(false);
  const  dispatch=useDispatch() 
   const {users}=useSelector(res=>res.data)
   const [imageUpload,setImageUpload]=useState([])
  const [open, setOpen] = useState(false);
  const [addFieldData,setAddFieldData]=useState({
    post:""
  })
const [showDataEmployee,setShowDataEmployee]=useState()
const [expanded, setExpanded] = useState(false);
const [filterDataData,setFilterData]=useState()
const [intialShowData,setIntialShowData]=useState()
const handleExpandClick = () => {
  setExpanded(!expanded);
};
  const [iconImg,setIconImg]=useState()
  const hadnleSubmit=(e)=>{
    
    e.preventDefault();
    var formData=new FormData()
    formData.append("role",addFieldData?.post)
    formData.append("image",imageUpload.image)

    dispatch(addFiledPostApi(formData))
    
    if( dispatch(addFiledPostApi(formData))){
      setOpen(false)
    }
    // console.log("addFiledData",addFieldData)
    // var formData=new FormData()
    // formData.append('image',iconImg.image)
    // formData.append('addFiled',addFieldData.addFiled)
    // if(formData){
    //   dispatch(addFiledPostApi(formData))
    // }
  }
  const handleImgChange=(e)=>{
    setImageUpload({image:e.target.files[0]})
  }
  const handleChangePost=(item)=>{
  console.log("item",item)
    const getData=JSON.parse(sessionStorage.getItem("AllEmployee"))
    console.log("getData",getData)
    if(getData){
      const filterData=getData?.filter(ele=>ele?.role===item)
      setFilterData(filterData)
      setShowDataEmployee(filterData)
    }
  }
  const showData=()=>{
    const getData=JSON.parse(sessionStorage.getItem("AllEmployee"))
    console.log("getData",getData)
    const filterData=getData?.filter(ele=>ele?.role==="CEO")
    console.log("filterData",filterData)
    setIntialShowData(filterData)
  }
useEffect(() => {
  handleChangePost()
  showData()
}, [])

const deletePostData=(item)=>{
  if(item){
    const employeeEditIdData=item?.id
    dispatch(deletePostApi(employeeEditIdData))
  } 
}

  const handleAddFieldOnChange=(e)=>{
    const { name, value } = e.target;
    setAddFieldData({ ...addFieldData, [name]: value });
  }

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  const getEmployeeAll=()=>{
      dispatch(getFiledPostApi())
    }
  
    useEffect(() => {
      getEmployeeAll()
    }, [])
  return (
    <>
       <div className='employee-page'>
       <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
         <div className='employee-page-model'>
         <form onSubmit={hadnleSubmit}>
         <FormControl>
                    <TextField
                      label="User Name"
                      type="file"
                      name="image"
                      onChange={handleImgChange}
                    />
                    </FormControl>
         <FormControl>
             <TextField
                      label="Post"
                      type="text"
                      name="post"
                      value={addFieldData?.post}
                      onChange={handleAddFieldOnChange}
                    />
          </FormControl>
          <Button  variant="contained" type='submit'>
          <AddIcon/>
           Add Field
          </Button>
         </form>
         </div>
        </Box>
      </Modal>

     <Helmet>
        <title> Dashboard: All Staff |  User Web </title>
      </Helmet>


      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          All Staff
        </Typography>
         <div className='add-post-field'>
         <Button  variant="contained" onClick={handleOpen}>
          <AddIcon/>
           Add Post Field
          </Button>
         </div>
        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              openFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
              <ProductSort />
          </Stack>
        </Stack>
          <Box sx={{display:"flex",justifyContent:"space-between"}}>
            {
              users?.map((item)=>{
                return(
                  <div key={item.id}>
                    <Button onClick={()=>handleChangePost(item.role)}>{item.role}</Button>
                    <IconButton aria-label="settings" sx={{paddingLeft:"0px"}} onClick={()=>deletePostData(item)}>
                      <DeleteIcon sx={{fontSize:"19px"}}/>
                    </IconButton>
                  </div>
                )
              })
            }
          </Box>
           <Box >
        <Box sx={{display:"grid",gridTemplateColumns:"repeat(3, minmax(0, 1fr))",gap:"30px",marginTop:"30px"}}>
        {
            showDataEmployee?.map((item,index)=>{
              const data=item?.userName
              const dataGet=data?.charAt(0).toUpperCase() + data?.slice(0,0);
              return(
                <div>
   <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                sx={{textTransform:"capitalize"}}
                  avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                      {dataGet}
                    </Avatar>
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={item?.userName}
                  subheader="September 14, 2016"
                />
                <CardMedia
                  component="img"
                  height="194"
                  image={`http://127.0.0.1:8000/${item?.image}`}
                  alt={item?.userName}
                />
                <CardContent>
               <Typography variant="body2" color="text.secondary" sx={{fontWeight:"bold",textTransform:"capitalize",fontSize:"16px"}}>
                 {item?.E_Id}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{fontWeight:"normal",textTransform:"capitalize",fontSize:"16px"}}>
                 {item?.userName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{fontWeight:"normal",fontSize:"16px"}}>
                 {item?.email}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
                  <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                    key={index}
                  >
                    <ExpandMoreIcon />
                  </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit   key={index}>
                  <CardContent>
                    <Typography paragraph>
                     Mobile No: {item.mobileNumber}
                    </Typography>
                    <Typography paragraph>
                    Salary:  {item.salary}
                    </Typography>
                    <Typography paragraph>
                    Post:  {item.role}
                    </Typography>
                  </CardContent>
                </Collapse>
              </Card> 
                </div>
              
            
              
              )
            })
          }
        </Box>
           </Box>
        {/* <ProductList products={showDataEmployee} /> */}
        <ProductCartWidget />
      </Container>
     </div>
    </>
  );
}
