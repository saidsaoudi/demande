const httpStatus = require('http-status');
const XLSX = require('xlsx');
const { uuid } = require('uuidv4');
const catchAsync = require('../utils/catchAsync');
const requestService = require('../services/request.service');

const createRequest = catchAsync(async (req, res) => {
  const body = {};
  if (Object.keys(req.files).length > 0) {
    for (const [key, value] of Object.entries(req.files)) {
      body[key] = value[0].filename;
      if (key === 'uploaded_doc') {
        const dfor_file = XLSX.readFile(value[0].path);
        const sheet_name_list = dfor_file.SheetNames;
        const demandedFor = XLSX.utils.sheet_to_json(dfor_file.Sheets[sheet_name_list[0]]);
        demandedFor.map((de) => {
          de.uuid = uuid();
          return de;
        });
        body.demandedFor = demandedFor;
      }
    }
    body.createdBy = req.user._id;
  }
  // console.log(body);
  const request = await requestService.createRequest(body);
  res.status(httpStatus.CREATED).send({ message: 'Request saved !', data: request });
});

const getRequests = catchAsync(async (req, res) => {
  const request = await requestService.getRequests();
  res.status(httpStatus.OK).send({ message: 'All requests listed !', data: request });
});

const getRequestById = catchAsync(async (req, res) => {
  const request = await requestService.getRequestById(req.params.id);
  res.status(httpStatus.OK).send({ message: 'Request listed!', data: request });
});

const getAuthorization = catchAsync(async (req, res) => {
  const request = await requestService.getRequestById(req.params.id);
  const data = request.demandedFor.find((r) => {
    return r.uuid === req.body.uuid;
  });
  if (request.status === 'Confirmed') {
    const blob = await requestService.getAuthorization(data);
    res.set({
      'Content-Disposition': `attachment; filename=Authorization.pdf`,
    });
    res.status(httpStatus.OK).send(blob);
  } else if (request.status === 'Refused') {
    res.status(httpStatus.FORBIDDEN).send({ message: 'Request is refused!' });
  } else {
    res.status(httpStatus.FORBIDDEN).send({ message: 'Request not accepted yet!' });
  }
});

const acceptRequest = catchAsync(async (req, res) => {
  const requestBody = { status: 'Confirmed' };
  const request = await requestService.acceptRequest(req.params.id, requestBody);
  res.status(httpStatus.OK).send({ message: 'Request accepted!', data: request });
});

const refuseRequest = catchAsync(async (req, res) => {
  const requestBody = { status: 'Refused' };
  const request = await requestService.refuseRequest(req.params.id, requestBody);
  res.status(httpStatus.OK).send({ message: 'Request refused!', data: request });
});

const uploadAuthTemplate = catchAsync(async (req, res) => {
  res.status(httpStatus.OK).send({ message: 'Template saved!' });
});

const uploadDocTemplate = catchAsync(async (req, res) => {
  res.status(httpStatus.OK).send({ message: 'Template saved!' });
});

const downloadAuthTemplate = catchAsync(async (req, res) => {
  const filename = await requestService.getAuthTemplate();
  res.status(httpStatus.OK).download(`./public/${filename}`, filename);
});

const downloadDocTemplate = catchAsync(async (req, res) => {
  const filename = await requestService.getDocTemplate();
  res.status(httpStatus.OK).download(`./public/${filename}`, filename);
});

module.exports = {
  createRequest,
  getRequests,
  getRequestById,
  getAuthorization,
  acceptRequest,
  refuseRequest,
  uploadDocTemplate,
  uploadAuthTemplate,
  downloadAuthTemplate,
  downloadDocTemplate,
};
