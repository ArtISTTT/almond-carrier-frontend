import React from 'react';
import styles from '../../styles/Receiver.module.css';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Autocomplete, Box, Container, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import CarrierLayout from '../../src/Components/Layouts/Carrier';
import { orderStatus } from '../../src/interfaces/profile';
import OrderItem from '../../src/Components/profile/OrderItem';

// interface CountryType {
//     code: string;
//     label: string;
//     phone: string;
//     suggested?: boolean;
// }

const orders = [
    {
        status: orderStatus.awaitingDelivery,
        item: 'Nuts',
        from: 'Moscow',
        to: 'Antalya',
        reward: 500,
        estimatedDate: dayjs('2019-01-25'),
    },
    {
        status: orderStatus.awaitingDelivery,
        item: 'Nuts',
        from: 'Moscow',
        to: 'Antalya',
        reward: 500,
        estimatedDate: dayjs('2019-01-25'),
    },
    {
        status: orderStatus.awaitingDelivery,
        item: 'Nuts',
        from: 'Moscow',
        to: 'Antalya',
        reward: 500,
        estimatedDate: dayjs('2019-01-25'),
    },
];

const ReceiverPage: React.FC = () => {
    // const [ratingValue, setRatingValue] = React.useState<number | null>(5);

    // const [dateValue, setDateValue] = React.useState<Dayjs | null>(
    //     dayjs('22/04/2003')
    // );

    // const countries: readonly CountryType[] = [
    //     { code: 'AD', label: 'Andorra', phone: '376' },
    //     {
    //         code: 'AE',
    //         label: 'United Arab Emirates',
    //         phone: '971',
    //     },
    //     { code: 'AF', label: 'Afghanistan', phone: '93' },
    //     {
    //         code: 'AG',
    //         label: 'Antigua and Barbuda',
    //         phone: '1-268',
    //     },
    //     { code: 'AI', label: 'Anguilla', phone: '1-264' },
    //     { code: 'AL', label: 'Albania', phone: '355' },
    //     { code: 'AM', label: 'Armenia', phone: '374' },
    //     { code: 'AO', label: 'Angola', phone: '244' },
    //     { code: 'AQ', label: 'Antarctica', phone: '672' },
    //     { code: 'AR', label: 'Argentina', phone: '54' },
    //     { code: 'AS', label: 'American Samoa', phone: '1-684' },
    //     { code: 'AT', label: 'Austria', phone: '43' },
    // ];

    // const handleDateChange = (newDateValue: Dayjs | null) => {
    //     setDateValue(newDateValue);
    // };

    // const columns: GridColDef[] = [
    //     {
    //         field: 'name',
    //         headerAlign: 'center',
    //         headerName: 'Name',
    //         type: 'string',
    //         width: 250,
    //         sortable: false,
    //     },
    //     {
    //         field: 'departure',
    //         headerAlign: 'center',
    //         headerName: 'Departure country',
    //         type: 'string',
    //         width: 180,
    //         sortable: false,
    //     },
    //     {
    //         field: 'arrival',
    //         headerAlign: 'center',
    //         headerName: 'Arrival country',
    //         type: 'string',
    //         width: 180,
    //         sortable: false,
    //     },
    //     {
    //         field: 'weight',
    //         headerAlign: 'center',
    //         // headerName: 'Permissible weight',
    //         headerName: 'Weight',
    //         type: 'number',
    //         width: 180,
    //         sortable: false,
    //     },
    //     {
    //         field: 'date',
    //         headerAlign: 'center',
    //         headerName: 'Departure date',
    //         type: 'date',
    //         width: 180,
    //         sortable: false,
    //     },
    //     {
    //         field: 'rating',
    //         headerAlign: 'center',
    //         headerName: 'Rating',
    //         type: 'string',
    //         width: 180,
    //         sortable: false,
    //     },
    // ];

    // const rows = [
    //     {
    //         id: 1,
    //         name: 'Vadimka Chetoshkin',
    //         departure: 'Uzbekistan',
    //         arrival: 'Tajikistan',
    //         weight: 15,
    //         date: 2002,
    //         rating: 5,
    //     },
    //     {
    //         id: 2,
    //         name: 'Vadimka Chetoshkin',
    //         departure: 'Uzbekistan',
    //         arrival: 'Tajikistan',
    //         weight: 15,
    //         date: 2002,
    //         rating: 5,
    //     },
    //     {
    //         id: 3,
    //         name: 'Vadimka Chetoshkin',
    //         departure: 'Uzbekistan',
    //         arrival: 'Tajikistan',
    //         weight: 15,
    //         date: 2002,
    //         rating: 5,
    //     },
    //     {
    //         id: 4,
    //         name: 'Vadimka Chetoshkin',
    //         departure: 'Uzbekistan',
    //         arrival: 'Tajikistan',
    //         weight: 15,
    //         date: 2002,
    //         rating: 5,
    //     },
    //     {
    //         id: 5,
    //         name: 'Vadimka Chetoshkin',
    //         departure: 'Uzbekistan',
    //         arrival: 'Tajikistan',
    //         weight: 15,
    //         date: 2002,
    //         rating: 5,
    //     },
    //     {
    //         id: 6,
    //         name: 'Vadimka Chetoshkin',
    //         departure: 'Uzbekistan',
    //         arrival: 'Tajikistan',
    //         weight: 15,
    //         date: 2002,
    //         rating: 5,
    //     },
    //     {
    //         id: 7,
    //         name: 'Vadimka Chetoshkin',
    //         departure: 'Uzbekistan',
    //         arrival: 'Tajikistan',
    //         weight: 15,
    //         date: 2002,
    //         rating: 5,
    //     },
    // ];

    return (
        <CarrierLayout>
            <Typography variant='h2' component='h2'>
                Live orders
            </Typography>
            <div>
                <div>
                    <div>
                        {orders.map((order, i) => (
                            <OrderItem
                                key={i}
                                status={order.status}
                                item={order.item}
                                from={order.from}
                                to={order.to}
                                estimatedDate={order.estimatedDate}
                                reward={order.reward}
                            />
                        ))}
                    </div>
                    <div></div>
                </div>
                <div></div>
            </div>
        </CarrierLayout>
        // <CarrierLayout>
        //     <Container className={styles.container} maxWidth={false}>
        //         <Typography className={styles.title}>
        //             Arrivals requests
        //         </Typography>
        //         <div className={styles.filter}>
        //             <div className={styles.filterList}>
        //                 <TextField
        //                     id='outlined-basic'
        //                     label='Name'
        //                     variant='outlined'
        //                     className={styles.filterItem}
        //                 />
        //                 <Autocomplete
        //                     id='country-select-demo'
        //                     sx={{ width: 250 }}
        //                     options={countries}
        //                     className={styles.filterItem}
        //                     autoHighlight
        //                     getOptionLabel={option => option.label}
        //                     renderOption={(props, option) => (
        //                         <Box
        //                             component='li'
        //                             sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
        //                             {...props}
        //                         >
        //                             <img
        //                                 loading='lazy'
        //                                 width='20'
        //                                 src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
        //                                 srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
        //                                 alt=''
        //                             />
        //                             {option.label}
        //                         </Box>
        //                     )}
        //                     renderInput={params => (
        //                         <TextField
        //                             {...params}
        //                             label='Departure country'
        //                             inputProps={{
        //                                 ...params.inputProps,
        //                             }}
        //                         />
        //                     )}
        //                 />
        //                 <Autocomplete
        //                     id='country-select-demo'
        //                     sx={{ width: 240 }}
        //                     options={countries}
        //                     autoHighlight
        //                     className={styles.filterItem}
        //                     getOptionLabel={option => option.label}
        //                     renderOption={(props, option) => (
        //                         <Box
        //                             component='li'
        //                             sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
        //                             {...props}
        //                         >
        //                             <img
        //                                 loading='lazy'
        //                                 width='20'
        //                                 src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
        //                                 srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
        //                                 alt=''
        //                             />
        //                             {option.label}
        //                         </Box>
        //                     )}
        //                     renderInput={params => (
        //                         <TextField
        //                             {...params}
        //                             label='Arrival country'
        //                             inputProps={{
        //                                 ...params.inputProps,
        //                             }}
        //                         />
        //                     )}
        //                 />
        //                 <TextField
        //                     id='outlined-basic'
        //                     label='Weight'
        //                     variant='outlined'
        //                     className={styles.filterItem}
        //                 />
        //                 <LocalizationProvider dateAdapter={AdapterDayjs}>
        //                     <DesktopDatePicker
        //                         value={dateValue}
        //                         inputFormat='DD/MM/YYYY'
        //                         onChange={handleDateChange}
        //                         label='Departure Date'
        //                         renderInput={params => (
        //                             <TextField {...params} />
        //                         )}
        //                         className={styles.filterItem}
        //                     />
        //                 </LocalizationProvider>
        //                 <Rating
        //                     name='simple-controlled'
        //                     value={ratingValue}
        //                     className={styles.filterItem}
        //                     onChange={(event, newValue) => {
        //                         setRatingValue(newValue);
        //                     }}
        //                 />
        //             </div>
        //         </div>
        //         <div className={styles.table}>
        //             <DataGrid
        //                 sx={{
        //                     '& .column': {
        //                         display: 'flex',
        //                         justifyContent: 'center',
        //                     },
        //                 }}
        //                 getCellClassName={() => 'column'}
        //                 rows={rows}
        //                 columns={columns}
        //                 pageSize={10}
        //                 autoHeight={true}
        //                 rowsPerPageOptions={[10]}
        //                 disableColumnMenu
        //             />
        //         </div>
        //     </Container>
        // </CarrierLayout>
    );
};

export default ReceiverPage;
