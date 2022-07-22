import React, { useEffect, useState } from 'react';
import { Box, TextField, Typography, FormLabel } from '@material-ui/core';
import { DataGridPro, GridColDef } from '@mui/x-data-grid-pro';
import './DataGridExternalProject.scss'

function ExternalProject() {
  const [searchText, setSearchText] = useState('');
  const [pageSize, setPageSize] = useState<number>(5);
  const [rows, setRows] = useState<any>([])

  useEffect(() => {
    fetch((`http://universities.hipolabs.com/search?country=${searchText}`)).then((res) => res.json())
      .then((response) => {
        setRows(response.map((item: any, index: number) => (
          {
            id: index,
            country: item?.country,
            SerialNumber: index + 1,
            univercityname: item?.name,
            stateProvience: item?.['state-province'],
            universitywebsite: item?.web_pages?.[0]
          }
        )))
      })
    setSearchText('');
  }, [searchText])

  const columns: GridColDef[] = [
    {
      field: 'SerialNumber',
      headerName: 'SL no',
    },
    {
      field: 'country',
      headerName: 'Country',
      flex: 1
    },
    {
      field: 'stateProvience',
      headerName: 'State/Provience',
      flex: 1
    },
    {
      field: 'univercityname',
      headerName: 'University Name',
      flex: 1
    },
    {
      field: 'universitywebsite',
      headerName: 'University Website',
      flex: 2
    },
  ];

  return (
    <Box className="dataGrid">
      <Typography variant='h1' className="title">Universites Details</Typography>
      <Box className="search-content">
        <i className="ri-search-2-line ri-lg" />
        <TextField type="text" placeholder='Enter Country Name' onBlur={(e) => { setSearchText(e.target.value) }} >
        </TextField>
      </Box>
      <Box>
        {rows &&
          <DataGridPro
            className="dataGridPro"
            rowCount={rows?.length}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 20]}
            pagination
            autoHeight
            showColumnRightBorder
            showCellRightBorder
            columns={columns}
            rows={rows ?? []}
            classes= {{
              columnHeaders: "columnHeadersCustomized",
            }}
            disableSelectionOnClick
          /> 
        }
      </Box>
    </Box>

  )
}
export default ExternalProject;