variable "project_id" {
  description = "GCP project ID"
  type        = string
}

variable "artifact_registry" {
  description = "Artifact registry name"
  type = object({
    location   = string
    repository = string
    tag        = optional(string, "latest")
  })
}

variable "cloudrun" {
  description = "Cloud Run service configuration"
  type = object({
    service_name    = string
    region          = string
    service_account = string
  })
}
