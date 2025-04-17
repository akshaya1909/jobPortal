import Job from "../models/job.js";

// Create Job
export const createJob = async (req, res) => {
  try {
    const job = await Job.create(req.body);
    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get All or Filtered Jobs
export const getJobs = async (req, res) => {
  try {
    console.log("req from salary",req.query)
    const { title, location, salaryMin, salaryMax, jobType } = req.query;

    const query = {};

    if (title) query.title = new RegExp(title, "i");
    if (location) query.location = new RegExp(location, "i");
    if (jobType) query.jobType = jobType;

    if (salaryMin || salaryMax) {
      query["salary.from"] = {};
      query["salary.to"] = {};
    
      if (salaryMin) {
        query["salary.to"].$gte = Number(salaryMin); // job's max >= user's min
      }
    
      if (salaryMax) {
        query["salary.from"].$lte = Number(salaryMax); // job's min <= user's max
      }
    
      // Remove empty objects
      if (Object.keys(query["salary.from"]).length === 0) delete query["salary.from"];
      if (Object.keys(query["salary.to"]).length === 0) delete query["salary.to"];
    }

    const jobs = await Job.find(query).sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const uploadLogo = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const filePath = `/${req.file.path.replace(/\\/g, "/")}`; // normalize Windows path
  res.status(200).json({ filePath });
};
