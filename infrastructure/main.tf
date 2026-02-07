terraform {
  required_version = ">= 1.0"
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 4.0"
    }
  }

  backend "gcs" {
    # Add your backend bucket name by CLI.
    prefix = "terraform/state"
  }
}

provider "google" {
  project = var.project_id
}

module "cloudbuild_trigger" {
  source = "./modules/cloudbuild_trigger"

  project_id         = var.project_id
  service_name       = var.cloudrun.service_name
  gh_repository      = var.gh_repository
  artifact_registry  = var.artifact_registry
  cloudbuild_trigger = var.cloudbuild_trigger
}

module "cloudrun" {
  source = "./modules/cloudrun"

  project_id        = var.project_id
  artifact_registry = var.artifact_registry
  cloudrun          = var.cloudrun
}
