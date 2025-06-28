"use client"
import { useState } from "react"
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Grid,
  List,
  ListItem,
  ListItemText,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material"
import {
  InsertDriveFile as FileIcon,
  TrendingUp as TrendingUpIcon,
  Search as SearchIcon,
  Upload as UploadIcon,
  CheckCircle,
  Schedule,
  Error as ErrorIcon,
  Description,
  Close,
  Download,
} from "@mui/icons-material"

function DocumentManager() {
  const [documents, setDocuments] = useState([])
  const [uploading, setUploading] = useState(false)
  const [selectedDoc, setSelectedDoc] = useState(null)
  const [openDialog, setOpenDialog] = useState(false)
  const [generatingReport, setGeneratingReport] = useState(false)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  })

  const graniteConfig = {
    apiKey: "xMTnxwuzf4qJdpAjFpMMyu9bRJPd9zePk-krnXLOtV0l",
    endpoints: {
      extract: "https://api.graniteai.com/v1/extract",
      analyze: "https://api.graniteai.com/v1/analyze",
      reports: "https://api.graniteai.com/v1/reports"
    },
    getHeaders: () => ({
      "Content-Type": "application/json",
      "Authorization": `Bearer xMTnxwuzf4qJdpAjFpMMyu9bRJPd9zePk-krnXLOtV0l`
    })
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "processed": return <CheckCircle color="success" />
      case "processing": return <Schedule color="warning" />
      case "error": return <ErrorIcon color="error" />
      default: return <Description color="disabled" />
    }
  }

  const extractTextWithGranite = async (file) => {
    const formData = new FormData()
    formData.append('file', file)
    
    try {
      const response = await fetch(graniteConfig.endpoints.extract, {
        method: 'POST',
        headers: {
          'Authorization': graniteConfig.getHeaders().Authorization
        },
        body: formData
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Text extraction failed')
      }
      
      const result = await response.json()
      return result.text || ""
    } catch (error) {
      console.error("Granite extraction error:", error)
      throw new Error(`Extraction failed: ${error.message}`)
    }
  }

  const analyzeWithGranite = async (text, filename) => {
    try {
      const response = await fetch(graniteConfig.endpoints.analyze, {
        method: 'POST',
        headers: graniteConfig.getHeaders(),
        body: JSON.stringify({
          text,
          filename,
          options: {
            summarize: true,
            extract_keywords: true,
            analyze_sentiment: true
          }
        })
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || `API error: ${response.status}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error("Granite analysis error:", error)
      throw new Error(`Analysis failed: ${error.message}`)
    }
  }

  const generateGraniteReport = async (documentId) => {
    try {
      const response = await fetch(graniteConfig.endpoints.reports, {
        method: 'POST',
        headers: graniteConfig.getHeaders(),
        body: JSON.stringify({ document_id: documentId })
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Report generation failed')
      }
      
      return await response.blob()
    } catch (error) {
      console.error("Granite report error:", error)
      throw new Error(`Report generation failed: ${error.message}`)
    }
  }

  const handleFileUpload = async (event) => {
    const file = event.target.files[0]
    if (!file) return
    
    const validTypes = ['application/pdf', 'text/plain', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    const maxSize = 10 * 1024 * 1024
    
    if (!validTypes.includes(file.type)) {
      setSnackbar({ open: true, message: 'Please upload a PDF, TXT, or DOCX file', severity: 'error' })
      return
    }
    
    if (file.size > maxSize) {
      setSnackbar({ open: true, message: 'File size exceeds 10MB limit', severity: 'error' })
      return
    }
    
    const newDoc = {
      id: Date.now(),
      name: file.name,
      type: file.type.split('/').pop().toUpperCase(),
      size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
      uploadedAt: new Date().toLocaleString(),
      status: "processing",
      insights: [],
      keyMetrics: {},
      fileContent: null,
      summary: "",
      graniteId: null
    }
    
    setDocuments(prev => [newDoc, ...prev])
    setUploading(true)
    
    try {
      const extractedText = await extractTextWithGranite(file)
      const analysis = await analyzeWithGranite(extractedText, file.name)
      
      setDocuments(prevDocs =>
        prevDocs.map(doc =>
          doc.id === newDoc.id
            ? {
                ...doc,
                status: "processed",
                insights: analysis.insights || [],
                keyMetrics: analysis.metrics || {},
                summary: analysis.summary || "No summary available",
                graniteId: analysis.document_id,
                fileContent: URL.createObjectURL(file)
              }
            : doc
        )
      )
      
      setSnackbar({ open: true, message: 'Document processed successfully', severity: 'success' })
    } catch (error) {
      console.error("Processing error:", error)
      setDocuments(prevDocs =>
        prevDocs.map(doc =>
          doc.id === newDoc.id
            ? { ...doc, status: "error" }
            : doc
        )
      )
      setSnackbar({ open: true, message: error.message || 'Failed to process document', severity: 'error' })
    } finally {
      setUploading(false)
      event.target.value = null
    }
  }

  const handleGenerateReport = async (doc) => {
    if (!doc.graniteId) {
      setSnackbar({ open: true, message: 'Document not properly processed', severity: 'error' })
      return
    }
    
    setGeneratingReport(true)
    
    try {
      const reportBlob = await generateGraniteReport(doc.graniteId)
      const url = URL.createObjectURL(reportBlob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${doc.name.replace(/\.[^/.]+$/, "")}_report.txt`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      
      setSnackbar({ open: true, message: 'Report downloaded successfully', severity: 'success' })
    } catch (error) {
      console.error("Report generation error:", error)
      setSnackbar({ open: true, message: error.message || 'Failed to generate report', severity: 'error' })
    } finally {
      setGeneratingReport(false)
    }
  }

  const handleViewDetails = (doc) => {
    setSelectedDoc(doc)
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setSelectedDoc(null)
  }

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }))
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Document Intelligence</Typography>
      <Typography variant="body1" gutterBottom sx={{ mb: 3 }}>AI-powered document analysis and insights</Typography>
      
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Button
                component="label"
                variant="contained"
                startIcon={<UploadIcon />}
                disabled={uploading}
              >
                {uploading ? "Uploading..." : "Upload Document"}
                <input type="file" hidden onChange={handleFileUpload} accept=".pdf,.txt,.docx" />
              </Button>
            </Grid>
            {uploading && (
              <Grid item>
                <CircularProgress size={24} />
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Card>

      <Grid container spacing={3}>
        {documents.length === 0 ? (
          <Grid item xs={12}>
            <Card>
              <CardContent sx={{ textAlign: 'center', py: 4 }}>
                <FileIcon color="disabled" sx={{ fontSize: 60, mb: 2 }} />
                <Typography variant="h6" color="textSecondary">
                  No documents uploaded yet
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Upload a document to get started
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ) : (
          documents.map((doc) => (
            <Grid item xs={12} md={6} key={doc.id}>
              <Card>
                <CardContent>
                  <Box display="flex" alignItems="center" gap={2} mb={1}>
                    {getStatusIcon(doc.status)}
                    <Typography variant="h6">{doc.name}</Typography>
                    <Chip label={doc.type} size="small" />
                  </Box>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    {doc.size} • {doc.uploadedAt}
                  </Typography>

                  {doc.status === "processed" && (
                    <>
                      {doc.summary && (
                        <Box mt={2}>
                          <Typography variant="subtitle2">Summary</Typography>
                          <Typography variant="body2">
                            {doc.summary.length > 150
                              ? `${doc.summary.substring(0, 150)}...`
                              : doc.summary}
                          </Typography>
                        </Box>
                      )}
                      
                      {doc.insights.length > 0 && (
                        <Box mt={2}>
                          <Typography variant="subtitle2">Key Insights</Typography>
                          <List dense>
                            {doc.insights.slice(0, 2).map((insight, i) => (
                              <ListItem key={i}>
                                <ListItemText primary={insight} />
                              </ListItem>
                            ))}
                          </List>
                        </Box>
                      )}
                    </>
                  )}

                  {doc.status === "processing" && (
                    <Box mt={2} p={2} bgcolor="warning.light" borderRadius={1}>
                      <Typography>Processing document...</Typography>
                    </Box>
                  )}

                  {doc.status === "error" && (
                    <Box mt={2} p={2} bgcolor="error.light" borderRadius={1}>
                      <Typography>Failed to process document</Typography>
                    </Box>
                  )}

                  <Box mt={3} display="flex" justifyContent="space-between">
                    <Button
                      size="small"
                      onClick={() => handleViewDetails(doc)}
                      disabled={doc.status !== "processed"}
                    >
                      View Details
                    </Button>
                    <Button
                      size="small"
                      startIcon={generatingReport ? <CircularProgress size={14} /> : <Download />}
                      onClick={() => handleGenerateReport(doc)}
                      disabled={doc.status !== "processed" || generatingReport}
                    >
                      {generatingReport ? "Generating..." : "Download Report"}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            Document Details
            <IconButton onClick={handleCloseDialog}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          {selectedDoc && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>{selectedDoc.name}</Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  {selectedDoc.type} • {selectedDoc.size} • {selectedDoc.uploadedAt}
                </Typography>

                {selectedDoc.summary && (
                  <Box mt={3}>
                    <Typography variant="subtitle1" gutterBottom>Summary</Typography>
                    <Typography variant="body2">{selectedDoc.summary}</Typography>
                  </Box>
                )}

                {selectedDoc.insights.length > 0 && (
                  <Box mt={3}>
                    <Typography variant="subtitle1" gutterBottom>Insights</Typography>
                    <List>
                      {selectedDoc.insights.map((insight, i) => (
                        <ListItem key={i}>
                          <ListItemText primary={insight} />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                )}

                {Object.keys(selectedDoc.keyMetrics).length > 0 && (
                  <Box mt={3}>
                    <Typography variant="subtitle1" gutterBottom>Metrics</Typography>
                    <Grid container spacing={2}>
                      {Object.entries(selectedDoc.keyMetrics).map(([key, value]) => (
                        <Grid item xs={6} sm={4} key={key}>
                          <Box bgcolor="background.default" p={1} borderRadius={1}>
                            <Typography variant="caption" display="block" color="textSecondary">
                              {key}
                            </Typography>
                            <Typography variant="body1" fontWeight="bold">
                              {value}
                            </Typography>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                )}
              </Grid>

              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    height: '100%',
                    border: '1px dashed',
                    borderColor: 'divider',
                    borderRadius: 1,
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: 300
                  }}
                >
                  {selectedDoc.fileContent ? (
                    <iframe
                      src={selectedDoc.fileContent}
                      width="100%"
                      height="500px"
                      style={{ border: 'none' }}
                      title="Document preview"
                    />
                  ) : (
                    <Typography color="textSecondary">Preview not available</Typography>
                  )}
                </Box>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
          <Button
            variant="contained"
            onClick={() => {
              handleGenerateReport(selectedDoc)
              handleCloseDialog()
            }}
            disabled={!selectedDoc?.graniteId || generatingReport}
            startIcon={<Download />}
          >
            Download Full Report
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default DocumentManager