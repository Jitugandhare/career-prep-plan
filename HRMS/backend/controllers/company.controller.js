const { 
  Company, 
  Department, 
  Section, 
  Team, 
  ShiftCategory, 
  Holiday, 
  CompanyEvent 
} = require('../models/Company.js');
const { asyncHandler, createNotFoundError, createValidationError } = require('../middleware/errorHandler.js');

// @desc    Get company profile
// @route   GET /api/company/profile
// @access  Private
const getCompanyProfile = asyncHandler(async (req, res) => {
  const company = await Company.findOne({ isActive: true });
  
  if (!company) {
    throw createNotFoundError('Company profile not found');
  }

  res.status(200).json({
    success: true,
    data: company
  });
});

// @desc    Update company profile
// @route   PUT /api/company/profile
// @access  Private (Admin)
const updateCompanyProfile = asyncHandler(async (req, res) => {
  const {
    name,
    type,
    registrationNumber,
    gstNumber,
    address,
    contactInfo,
    industry,
    foundedYear,
    employeeCount
  } = req.body;

  let company = await Company.findOne({ isActive: true });
  
  if (!company) {
    // Create new company if none exists
    company = await Company.create({
      name,
      type,
      registrationNumber,
      gstNumber,
      address,
      contactInfo,
      industry,
      foundedYear,
      employeeCount
    });
  } else {
    // Update existing company
    company = await Company.findByIdAndUpdate(
      company._id,
      {
        name,
        type,
        registrationNumber,
        gstNumber,
        address,
        contactInfo,
        industry,
        foundedYear,
        employeeCount
      },
      { new: true, runValidators: true }
    );
  }

  res.status(200).json({
    success: true,
    data: company
  });
});

// @desc    Get all departments
// @route   GET /api/company/departments
// @access  Private
const getAllDepartments = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, search, isActive } = req.query;

  const query = {};
  if (search) {
    query.name = { $regex: search, $options: 'i' };
  }
  if (isActive !== undefined) {
    query.isActive = isActive === 'true';
  }

  const departments = await Department.find(query)
    .populate('head', 'fullName employeeId')
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ name: 1 });

  const total = await Department.countDocuments(query);

  res.status(200).json({
    success: true,
    data: departments,
    pagination: {
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      itemsPerPage: parseInt(limit)
    }
  });
});

// @desc    Get department by ID
// @route   GET /api/company/departments/:id
// @access  Private
const getDepartmentById = asyncHandler(async (req, res) => {
  const department = await Department.findById(req.params.id)
    .populate('head', 'fullName employeeId designation')
    .populate({
      path: 'sections',
      populate: {
        path: 'head',
        select: 'fullName employeeId designation'
      }
    });

  if (!department) {
    throw createNotFoundError('Department not found');
  }

  res.status(200).json({
    success: true,
    data: department
  });
});

// @desc    Create department
// @route   POST /api/company/departments
// @access  Private (Admin)
const createDepartment = asyncHandler(async (req, res) => {
  const { name, code, description, head } = req.body;

  // Check if department code already exists
  const existingDept = await Department.findOne({ code });
  if (existingDept) {
    throw createValidationError('Department code already exists');
  }

  const department = await Department.create({
    name,
    code,
    description,
    head
  });

  await department.populate('head', 'fullName employeeId');

  res.status(201).json({
    success: true,
    data: department
  });
});

// @desc    Update department
// @route   PUT /api/company/departments/:id
// @access  Private (Admin)
const updateDepartment = asyncHandler(async (req, res) => {
  const { name, code, description, head } = req.body;

  // Check if code is being changed and if it conflicts
  if (code) {
    const existingDept = await Department.findOne({ code, _id: { $ne: req.params.id } });
    if (existingDept) {
      throw createValidationError('Department code already exists');
    }
  }

  const department = await Department.findByIdAndUpdate(
    req.params.id,
    { name, code, description, head },
    { new: true, runValidators: true }
  ).populate('head', 'fullName employeeId');

  if (!department) {
    throw createNotFoundError('Department not found');
  }

  res.status(200).json({
    success: true,
    data: department
  });
});

// @desc    Delete department
// @route   DELETE /api/company/departments/:id
// @access  Private (Admin)
const deleteDepartment = asyncHandler(async (req, res) => {
  const department = await Department.findById(req.params.id);

  if (!department) {
    throw createNotFoundError('Department not found');
  }

  // Check if department has sections
  const sectionsCount = await Section.countDocuments({ department: req.params.id });
  if (sectionsCount > 0) {
    throw createValidationError('Cannot delete department with existing sections');
  }

  // Soft delete
  department.isActive = false;
  await department.save();

  res.status(200).json({
    success: true,
    message: 'Department deleted successfully'
  });
});

// @desc    Get all sections
// @route   GET /api/company/sections
// @access  Private
const getAllSections = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, search, department, isActive } = req.query;

  const query = {};
  if (search) {
    query.name = { $regex: search, $options: 'i' };
  }
  if (department) {
    query.department = department;
  }
  if (isActive !== undefined) {
    query.isActive = isActive === 'true';
  }

  const sections = await Section.find(query)
    .populate('department', 'name code')
    .populate('head', 'fullName employeeId')
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ name: 1 });

  const total = await Section.countDocuments(query);

  res.status(200).json({
    success: true,
    data: sections,
    pagination: {
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      itemsPerPage: parseInt(limit)
    }
  });
});

// @desc    Create section
// @route   POST /api/company/sections
// @access  Private (Admin)
const createSection = asyncHandler(async (req, res) => {
  const { name, code, department, description, head } = req.body;

  // Check if section code already exists in the department
  const existingSection = await Section.findOne({ code, department });
  if (existingSection) {
    throw createValidationError('Section code already exists in this department');
  }

  const section = await Section.create({
    name,
    code,
    department,
    description,
    head
  });

  await section.populate([
    { path: 'department', select: 'name code' },
    { path: 'head', select: 'fullName employeeId' }
  ]);

  res.status(201).json({
    success: true,
    data: section
  });
});

// @desc    Get all shift categories
// @route   GET /api/company/shifts
// @access  Private
const getAllShiftCategories = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, search, type, isActive } = req.query;

  const query = {};
  if (search) {
    query.name = { $regex: search, $options: 'i' };
  }
  if (type) {
    query.type = type;
  }
  if (isActive !== undefined) {
    query.isActive = isActive === 'true';
  }

  const shifts = await ShiftCategory.find(query)
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ name: 1 });

  const total = await ShiftCategory.countDocuments(query);

  res.status(200).json({
    success: true,
    data: shifts,
    pagination: {
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      itemsPerPage: parseInt(limit)
    }
  });
});

// @desc    Create shift category
// @route   POST /api/company/shifts
// @access  Private (Admin)
const createShiftCategory = asyncHandler(async (req, res) => {
  const {
    name,
    type,
    description,
    workingHours,
    weeklyOffs,
    gracePeriod
  } = req.body;

  const shift = await ShiftCategory.create({
    name,
    type,
    description,
    workingHours,
    weeklyOffs,
    gracePeriod
  });

  res.status(201).json({
    success: true,
    data: shift
  });
});

// @desc    Get all holidays
// @route   GET /api/company/holidays
// @access  Private
const getAllHolidays = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, year, type, isActive } = req.query;

  const query = {};
  if (year) {
    query.date = {
      $gte: new Date(year, 0, 1),
      $lt: new Date(parseInt(year) + 1, 0, 1)
    };
  }
  if (type) {
    query.type = type;
  }
  if (isActive !== undefined) {
    query.isActive = isActive === 'true';
  }

  const holidays = await Holiday.find(query)
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ date: 1 });

  const total = await Holiday.countDocuments(query);

  res.status(200).json({
    success: true,
    data: holidays,
    pagination: {
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      itemsPerPage: parseInt(limit)
    }
  });
});

// @desc    Create holiday
// @route   POST /api/company/holidays
// @access  Private (Admin)
const createHoliday = asyncHandler(async (req, res) => {
  const { name, date, type, description } = req.body;

  const holiday = await Holiday.create({
    name,
    date,
    type,
    description
  });

  res.status(201).json({
    success: true,
    data: holiday
  });
});

// @desc    Get all company events
// @route   GET /api/company/events
// @access  Private
const getAllCompanyEvents = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, search, type, startDate, endDate, isActive } = req.query;

  const query = {};
  if (search) {
    query.title = { $regex: search, $options: 'i' };
  }
  if (type) {
    query.type = type;
  }
  if (startDate && endDate) {
    query.startDate = {
      $gte: new Date(startDate),
      $lte: new Date(endDate)
    };
  }
  if (isActive !== undefined) {
    query.isActive = isActive === 'true';
  }

  const events = await CompanyEvent.find(query)
    .populate('attendees', 'fullName employeeId')
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ startDate: 1 });

  const total = await CompanyEvent.countDocuments(query);

  res.status(200).json({
    success: true,
    data: events,
    pagination: {
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      itemsPerPage: parseInt(limit)
    }
  });
});

// @desc    Create company event
// @route   POST /api/company/events
// @access  Private (Admin)
const createCompanyEvent = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    startDate,
    endDate,
    type,
    attendees,
    location
  } = req.body;

  const event = await CompanyEvent.create({
    title,
    description,
    startDate,
    endDate,
    type,
    attendees,
    location
  });

  await event.populate('attendees', 'fullName employeeId');

  res.status(201).json({
    success: true,
    data: event
  });
});

// @desc    Get organizational structure
// @route   GET /api/company/structure
// @access  Private
const getOrganizationalStructure = asyncHandler(async (req, res) => {
  const departments = await Department.find({ isActive: true })
    .populate({
      path: 'sections',
      match: { isActive: true },
      populate: {
        path: 'head',
        select: 'fullName employeeId designation'
      }
    })
    .populate('head', 'fullName employeeId designation');

  res.status(200).json({
    success: true,
    data: departments
  });
});

module.exports = {
  getCompanyProfile,
  updateCompanyProfile,
  getAllDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
  getAllSections,
  createSection,
  getAllShiftCategories,
  createShiftCategory,
  getAllHolidays,
  createHoliday,
  getAllCompanyEvents,
  createCompanyEvent,
  getOrganizationalStructure
};
