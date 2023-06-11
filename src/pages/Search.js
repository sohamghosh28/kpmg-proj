import React, { useEffect,useRef, useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import PageTitle from '../layouts/PageTitle';
import VirtualizedTable from '../components/table/VirtualizedTable';
import { Button, Grid, TextField, Tooltip } from '@mui/material';
import SkeletonForInboxSentbox from '../components/skeleton/Skeleton';
import CampaignIcon from '@mui/icons-material/Campaign';
import NoDataFound from '../components/noDataFound/NoDataFound';

const Sentbox = () => {
  const [sentBox, setSentBox] = useState([]);
  const [search, setSearch] = useState('');
  const [search1, setSearch1] = useState('');
  const [search2, setSearch2] = useState('');
  const [isInitialDataLoaded, setInitialDataLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredRows, setFilteredRows] = useState(sentBox)
  
  useEffect(()=>{
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // const response = await fetch('http://localhost');
        // const data = await response.json();

        
        // setSentBox(data.result.Sentbox);
        setSentBox(sample);
        // setFilteredRows(data.result.Sentbox);
        setFilteredRows(sample);
      } catch(err) {
        console.error(err);
      } finally {
        setIsLoading(false);
        setInitialDataLoaded(true);
      }
    }

    fetchData();
  }, []);


  
  
  function createData(id, branchName,places,tariff,website,contact,actions) {
    return { id, branchName,places,tariff,website,contact,actions};
  }

  const sample = [
    ['1', 'ABC', 'Thailand', '50000','www.ABC.com', '9800638761'],
    ['1', 'ABC', 'Thailand', '50000','www.ABC.com', '9800638761'],
  ];

  const columns = [
    {
      width: 100,
      label: 'Sl No.',
      dataKey: 'id',
    },
    {
      width: 160,
      label: 'Branch Name',
      dataKey: 'branchName',
    },
    {
      width: 160,
      label: 'Places',
      dataKey: 'places',
      // numeric: true,
    },
    {
      width: 180,
      label: 'Tariff',
      dataKey: 'tariff',
      // numeric: true,
    },
    {
      width: 200,
      label: 'Website',
      dataKey: 'website',
      // numeric: true,
    },
    {
      width: 150,
      label: 'Contact',
      dataKey: 'contact',
      // numeric: true,
    },
    {
      width: 90,
      label: 'Actions',
      dataKey: 'actions',
      // numeric: true,
    },
  ];
  

  const handleSearchChange =(e) => {
    setSearch(e.target.value);
  }
  const handleSearchChange1 =(e) => {
    setSearch1(e.target.value);
  }
  const handleSearchChange2 =(e) => {
    setSearch2(e.target.value);
  }
  const handleSearchSubmit =(e) => {
    if (!search.length||!search1.length||!search2.length) {
      setFilteredRows(sentBox);
      return;
    }
    const newFilteredRows = sentBox.filter(
      item => 
      (`${item.id}`).toLowerCase().includes(search.toLowerCase()) || (`${item.branchName}`).toLowerCase().includes(search1.toLowerCase()) || (`${item.places}`).toLowerCase().includes(search2.toLowerCase())
    )
    setFilteredRows(newFilteredRows);
  }


  const rows = filteredRows.map((item, index) => {
    return createData(
      // index+1,
      `${item.id}`,
      item.branchName,
      item.places,
      item.tariff,
      item.website,
      item.contact,
      (
        <Grid display={'flex'}>
          <Tooltip title='Alert Again' arrow>
            <Button size='small' sx={{pr:2}} onClick={() => console.log(rows)}>
              <CampaignIcon sx={{ color:'purple'}}/>
            </Button>
          </Tooltip>  
        </Grid>
      )
    )
  });
    
    const name='Package Search'
    return (
      <Card>
        <CardContent>
        <br/>
          <PageTitle name={name} />
          <br/>
          {isInitialDataLoaded ? (
            <>
              <Grid 
                container 
                alignItems='center' 
                display={'flex'}
                justify='center'
                direction="row"
                columnSpacing={2}
              >
                <Grid width='100%'item xs={12} sm={3} md={3} lg={3} >
                  <TextField 
                    label="Search for Branch ID"
                    variant='standard'
                    size='small'
                    sx={{width:'100%'}}
                    value={search}
                    onChange={handleSearchChange}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4}>
                <TextField 
                    label="Search for Branch Name"
                    variant='standard'
                    size='small'
                    sx={{width:'100%'}}
                    value={search1}
                    onChange={handleSearchChange1}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4}>
                <TextField 
                    label="Search for Places"
                    variant='standard'
                    size='small'
                    sx={{width:'100%'}}
                    value={search2}
                    onChange={handleSearchChange2}
                    autoFocus
                  />
                </Grid>
                <Grid ml={2}>
                  <Button variant='contained' size='small' type='submit' onClick ={handleSearchSubmit}>Search</Button>
                </Grid>
                {sample.length ? (
                  <VirtualizedTable 
                    columns={columns} rows={sample}
                  />
                ) : (
                  <NoDataFound search={ search } search1={ search1 } search2={ search2 } handleSearchChange1={handleSearchChange1} handleSearchChange2={handleSearchChange2} handleSearchChange={handleSearchChange}  handleSearchSubmit={handleSearchSubmit} />
                  // search1={ search1 } search2={ search2 } handleSearchChange1={handleSearchChange1} handleSearchChange2={handleSearchChange2}
                )}
              </Grid>
            </>
          ) : (
            <SkeletonForInboxSentbox />
          )}
        </CardContent>
      </Card>
    );
}

export default Sentbox;

// const [page, setPage] = React.useState(0);
    // const [rowsPerPage, setRowsPerPage] = React.useState(5);
  
    // const handleChangePage = (event, newPage) => {
    //   setPage(newPage);
    // };
  
    // const handleChangeRowsPerPage = (event) => {
    //   setRowsPerPage(parseInt(event.target.value, 10));
    //   setPage(0);
    // };

    //inside return
    {/* <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}

//dummy data
// const sample = [
  //   [<Link href='/cms/#/CRStatusFromSentBox'>T AP/FMPNL/2022/AP C439/CRM29580</Link>, 'With the approval Copy', 'With the approval Copy', 'Empanelment and Medical Audit', '02/02/2022 04:42:21 pm', 'Pending with ALAMURI VIJAY BHASKAR(AP_C214)','NA','PMU Verified', '-NA-', '-NA-', 'High', 'Work Flow Changes', '-NA-', '-NA-', 'ANUPAMA KETHAM REDDY', 'Normal Request', 'Change', ],
  //   // ['T AP/FMPNL/2022/AP C439/CRM29581', 'With the approval Copy', 'With the approval Copy', 'Empanelment and Medical Audit', '02/02/2022 04:42:21 pm'],
  //   // ['T AP/FMPNL/2022/AP C439/CRM29582', 'With the approval Copy', 'With the approval Copy', 'Empanelment and Medical Audit', '02/02/2022 04:42:21 pm'],
  //   // ['T AP/FMPNL/2022/AP C439/CRM29583', 'With the approval Copy', 'With the approval Copy', 'Empanelment and Medical Audit', '02/02/2022 04:42:21 pm'],
  //   // ['T AP/FMPNL/2022/AP C439/CRM29584', 'With the approval Copy', 'With the approval Copy', 'Empanelment and Medical Audit', '02/02/2022 04:42:21 pm'],
  // ];