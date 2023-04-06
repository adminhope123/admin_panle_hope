import { Helmet } from 'react-helmet-async';
// @mui
import { Grid, Button, Container, Stack, Typography,IconButton, ButtonGroup, Drawer, RadioGroup, FormControlLabel, Radio, Divider } from '@mui/material';
// components
import Iconify from '../components/iconify';
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../sections/@dashboard/blog';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Scrollbar from '../components/scrollbar/Scrollbar';


import { Box } from '@mui/system';
import { ProductFilterSidebar } from 'src/sections/@dashboard/products';
import { getEmployeeApi } from 'src/Redux/actions';
import LoaderComp from './loader/LoaderComp';
import NotFoundEmployee from './loader/NotFoundEmployee';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];

// ----------------------------------------------------------------------

export const FILTER_CATEGORY_OPTIONS = ["All Staff","CEO","HR","Student" ,"BDE","Node Js","Web Design","Web Developer","Wordpress Devloper","Wordpress Designer","Laravel Developer(PHP)","Android Devloper","React Js","Angular","UI/UX Design","Python","Designer"];
export default function AllStaffMembers() {
  const [openFilter, setOpenFilter] = useState(false);
  const dispatch=useDispatch()
  const {users}=useSelector(res=>res.data)
  const [userEmployeeData,setUserEmployeeData]=useState()
  const [iconPost,setIconPost]=useState()
  const [filterDataData,setFilterDataData]=useState()
  const [showDataAll,setShowDataAll]=useState(true)
  const [allEmployeeData,setAllEmployeeData]=useState()

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };
  const handleDataFilter=(item)=>{
   const userFilter=users?.filter(elee=>elee?.role===item)
   if(userFilter){
     setFilterDataData(userFilter)
   }
   setShowDataAll(false)
   const dataAdd=item
   const dataCheck=item.includes("All Staff")
   setAllEmployeeData(dataCheck)
  }

  
  const getUserData=async()=>{
        await dispatch(getEmployeeApi())
  }


  useEffect(() => {
     getUserData()
  }, [])
  
  return (
    <>
      <Helmet>
        <title> Dashboard: Staff |  User Web </title>
      </Helmet>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Staff
          </Typography>
        </Stack>

        {/* <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <BlogPostsSearch posts={userEmployeeData} />
        </Stack> */}
  {/* {
    userEmployeeData?.length ?
  <Box sx={{display:"flex",justifyContent:"center",marginBottom:"20px"}}>
  <Box sx={{border:"1px solid #dfe2e7",width:"100px",height:"100px",borderRadius:"50%",display:"flex",justifyContent:"center",alignItems:"center",}}>
  <img  key={iconPost} src={iconPost} width="66px" height="66px"/>
  </Box>
</Box>:<Box sx={{display:"flex",justifyContent:"center",marginBottom:"20px"}}>
<Box sx={{border:"1px solid #dfe2e7",width:"100px",height:"100px",borderRadius:"50%",display:"flex",justifyContent:"center",alignItems:"center",}}>
  <img   src={StaffIcon} width="66px" height="66px"/>
  </Box>
</Box>
  } */}
  {
    users?.length ?
    <div>
    <Box sx={{display:"flex",justifyContent:"flex-end",marginBottom:"10px"}}>  
     <Button disableRipple color="inherit" endIcon={<Iconify icon="ic:round-filter-list" />} onClick={handleOpenFilter}>
      Filters&nbsp;
    </Button>
      </Box>
      {
        showDataAll===true ?
          <div>
          <Grid container spacing={3}>
         {
           users?.map((postData, index) => (
             <BlogPostCard key={postData?.E_Id} postData={postData} index={index} />
           ))
         }
         </Grid>
       </div>:""
      }

  
  <div>
      
      {
          filterDataData?.length===0? 
          <div>
            {
              allEmployeeData===true ?
              <div>
                 <Grid container spacing={3}>
         {
           users?.map((postData, index) => (
             <BlogPostCard key={postData?.E_Id} postData={postData} index={index} />
           ))
         }
         </Grid>
                </div>:    <div>
          <NotFoundEmployee/>
          </div>
            }
         
            </div>
          :
            <Grid container spacing={3}>
            {
              filterDataData?.map((postData, index) => (
                <BlogPostCard key={postData?.E_Id} postData={postData} index={index} />
              ))
            }
            </Grid>
       
         }
      </div>
     
        {/* {
        userEmployeeData?.length?
        employees?.map((postData, index) => (
          <BlogPostCard key={postData?.E_Id} postData={postData} index={index} />
        ))
        : employees?.map((postData, index) => (
          <BlogPostCard key={postData?.E_Id} postData={postData} index={index} />
        ))
      } */}
      
      </div>:<LoaderComp/>
  }
     
      </Container>
    

      <Drawer
        anchor="right"
        open={openFilter}
        onClose={handleCloseFilter}
        PaperProps={{
          sx: { width: 280, border: 'none', overflow: 'hidden' },
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 1, py: 2 }}>
          <Typography variant="subtitle1" sx={{ ml: 1 }}>
            Filters
          </Typography>
          <IconButton onClick={handleCloseFilter}>
            <Iconify icon="eva:close-fill" />
          </IconButton>
        </Stack>

        <Divider />

        <Scrollbar>
          <Stack spacing={3} sx={{ p: 3 }}>
            <div>
              <Typography variant="subtitle1" gutterBottom>
                Team Members
              </Typography>
              <RadioGroup>
                {FILTER_CATEGORY_OPTIONS.map((item,index) => (
                <Box key={item}>
                    <FormControlLabel key={item} value={item}  control={<Radio  onClick={()=>handleDataFilter(item)}/>} label={item} />
                </Box>
                ))}
              </RadioGroup>
            </div>
          </Stack>
        </Scrollbar>
        <Box sx={{ p: 3 }}>
          <Button
            fullWidth
            size="large"
            type="submit"
            color="inherit"
            variant="outlined"
            startIcon={<Iconify icon="ic:round-clear-all" />}
            onClick={handleCloseFilter}
          >
          Close Filter
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
