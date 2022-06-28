import { filter } from 'lodash';
import { Link as RouterLink } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import * as react from 'react';
import {
  Card,
  Table,
  Stack,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  // Typography,
  TextField,
  CircularProgress,
  TableContainer,
  TablePagination
  // CircularProgress
} from '@mui/material';
import Page from '../../../components/Page';
import Scrollbar from '../../../components/Scrollbar';
import Iconify from '../../../components/Iconify';
import SearchNotFound from '../../../components/SearchNotFound';
//import { UserListHead, UserListToolbar, UserMoreMenu } from '../../../sections/@dashboard/user';
import { ProductListHead, ProductListToolbar, ProductMoreMenu } from '../../../sections/@dashboard/product';


// import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
// import * as Yup from 'yup';
// import { motion } from 'framer-motion';
import { useFormik, Form, FormikProvider } from 'formik';

import { useEffect } from 'react';
import { fetchProductListAsync } from '../redux/action';
import { createProductAsync } from '../redux/action';

const GetProductList = () => {
  const dispatch = useDispatch();
  const [page, setPage] = react.useState(0);

  const [order, setOrder] = react.useState('asc');

  const [selected, setSelected] = react.useState([]);

  const [orderBy, setOrderBy] = react.useState('name');

  const [filterName, setFilterName] = react.useState('');

  const [rowsPerPage, setRowsPerPage] = react.useState(5);

  const [open, setOpen] = react.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const { products, fetchProductListLoading, fetchProductListFailure } = useSelector((state) => state.product);

  const [value, setValue] = react.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };
  const CreateProductSchema = Yup.object().shape({
    quantity: Yup.string().required('quantity is required'),
    pricePerPiece: Yup.string().required('price per piece is required'),
    purchasedOn: Yup.string().required('purchased on  is required')
  });
  const formik = useFormik({
    initialValues: {
      quantity: '',
      pricePerPiece: '',
      purchasedOn: '',
    },
    validationSchema: CreateProductSchema,
    onSubmit: (values) => {
      const data = {

        quantity: values.quantity,
        pricePerPiece: values.pricePerPiece,
        purchasedOn: values.purchasedOn
      };
      console.log('data:', values);
      dispatch(createProductAsync(data));
      formik.resetForm();
    }
  });
  const { errors, touched, handleSubmit, getFieldProps } = formik;

  useEffect(() => {
    dispatch(fetchProductListAsync());
  }, [dispatch]);

  const style = {
    margin: 'auto',
    width: 500,
    bgcolor: 'background.paper',
    borderRadius: '12px',
    boxShadow: 24,
    p: 4
  };

  const TABLE_HEAD = [
    { id: 'id', label: 'No', alignRight: false },
    { id: 'quantity', label: 'quantity', alignRight: false },
    { id: 'priceperpiece', label: 'priceperpiece', alignRight: false },
    { id: 'purchasedOn', label: 'purchasedOn', alignRight: false }
  ];

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function applySortFilter(array, comparator, query) {
    const stabilizedThis = array?.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    if (query) {
      return filter(
        array,
        (_product) => _product.purchasedOn.indexOf(query) !== -1
      );
    }
    return stabilizedThis.map((el) => el[0]);
  }



  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - products.length) : 0;

  const filteredUsers = applySortFilter(products, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  if (fetchProductListLoading || !products) {
    return (
      <Page title="Site-Repo">
        <h1>Products</h1>
        <div
          style={{
            width: '100%',
            height: '50px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <CircularProgress />
        </div>
      </Page>
    );
  }
  if (fetchProductListFailure) {
    return (
      <Page title="Site-Repo">
        <h1>Fetching product failed </h1>
        <div
          style={{
            width: '100%',
            height: '50px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        ></div>
      </Page>
    );
  }
  return (
    <Page title="Site-Repo">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Product
          </Typography>
          <Button
            data-cy="addstaffbtn"
            variant="contained"
            onClick={handleOpen}
            component={RouterLink}
            to="#"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New Product
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{ display: 'flex', alignItems: 'center', jusitifyContent: 'center' }}
          >
            <Box sx={style}>
              {isLoading ? (
                <Box style={{ textAlign: 'center', justifyContent: 'center', alignSelf: 'center' }}>
                  <CircularProgress width={200} height={200} />
                </Box>
              ) : errorMsg !== '' ? (
                <Box
                  mt="20%"
                  ml="45%"
                  style={{ textAlign: 'center', justifyContent: 'center', alignSelf: 'center' }}
                >
                  {errorMsg}
                </Box>
              ) : (
                <Box sx={{ bgcolor: 'background.paper', width: 'auto' }}>
                  <div>
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                      style={{ marginLeft: '1em' }}
                    >
                      Register
                    </Typography>
                  </div>
                  {isSuccess ? (
                    <Box
                      style={{ textAlign: 'center', justifyContent: 'center', alignSelf: 'center' }}
                    >
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        style={{ marginLeft: '1em', color: 'green' }}
                      >
                        Successfully added
                      </Typography>
                    </Box>
                  ) : null}

                  <div style={{ display: 'flex' }}>
                    <TextField
                      style={{ marginRight: '10px', marginBottom: '1em' }}
                      fullWidth
                      autoComplete="quantity"
                      type="text"
                      label="quantity"
                      {...getFieldProps('quantity')}
                      error={Boolean(touched.quantity && errors.quantity)}
                      helperText={touched.quantity && errors.quantity}
                    />
                    <TextField
                      style={{ marginBottom: '1em' }}
                      fullWidth
                      autoComplete="priceperpiece"
                      type="text"
                      label="last priceperpiece"
                      {...getFieldProps('priceperpiece')}
                      error={Boolean(touched.pricePerPiece && errors.pricePerPiece)}
                      helperText={touched.pricePerPiece && errors.pricePerPiece}
                    />{' '}
                  </div>
                  <TextField
                    style={{ marginBottom: '1em' }}
                    fullWidth
                    autoComplete="purchasedOn"
                    type="text"
                    label="purchasedOn"
                    {...getFieldProps('purchasedOn')}
                    error={Boolean(touched.purchasedOn && errors.purchasedOn)}
                    helperText={touched.purchasedOn && errors.purchasedOn}
                  />
            

                  <div style={{ display: 'flex', marginTop: '2em', justifyContent: 'right' }}>
                    <Button onClick={() => handleClose} variant="contained" color="error">
                      Cancel
                    </Button>
                    <Button onClick={handleSubmit} variant="contained" sx={{ marginLeft: '1em' }}>
                      Save
                    </Button>
                  </div>
                  {/* </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              From File
            </TabPanel>
          </SwipeableViews> */}
                </Box>
              )}
            </Box>
          </Modal>
        </Stack>

        <Card id='cardproduct'>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />
          <Scrollbar id='scrollable'>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={products.length}
                  // numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                // onSelectAllClick={handleSelectAllClick}
                />
                <TableBody displayRowCheckbox={false}>
                  {filteredUsers
                    ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((staff, index) => {
                      const { id, quantity, pricePerPiece, purchasedOn } = product;
                      const isItemSelected = selected.indexOf(user) !== -1;
                      //user is the id for the user we can use it
                      return (
                        <TableRow
                          id='tablerow'
                          hover
                          key={user + id}
                          tabIndex={-1}
                        // role="checkbox"
                        // selected={isItemSelected}
                        // aria-checked={isItemSelected}
                        >
                          {/* <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleClick(event, user)}
                            />
                          </TableCell> */}
                          <TableCell align="left">{index + 1}</TableCell>
                          <TableCell align="left">{quantity}</TableCell>
                          <TableCell align="left">{pricePerPiece}</TableCell>
                          <TableCell align="left">{purchasedOn}</TableCell>
                          <TableCell id='tablecell' align="right">
                            <ProductMoreMenu data={product} qantity={quantity} initial="product" />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={products.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
};

export default GetProductList;
