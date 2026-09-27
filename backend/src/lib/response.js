export const ok = (res, data, status = 200) =>
  res.status(status).json({ success: true, data, error: null })

export const fail = (res, status, error) =>
  res.status(status).json({ success: false, data: null, error })
