# Terraform — infrastructure

## Overview

This directory contains Terraform configuration used to provision the project's cloud infrastructure (GCP resources).

## Prerequisites

- Install Terraform (v1.x recommended).
- Install and authenticate the Google Cloud SDK (if using GCP resources).
- A service account or user with permissions to create resources referenced in the Terraform files.

## Quick start

```bash
# Change to the infrastructure directory
cd infrastructure

# Initialize Terraform
terraform init -backend-config="bucket=<YOUR_BACKEND_BUCKET>"

# Preview changes
terraform plan -var-file=terraform.tfvars

# Apply changes
terraform apply -var-file=terraform.tfvars
```

## Or import existing resources

If you have existing resources that you want to manage with Terraform, use the `terraform import` command. For example:

```bash
# E.g., Import an existing Cloud Run service
terraform import module.cloudrun.google_cloud_run_v2_service.chracl_rating_dashboard_service projects/PROJECT_ID/locations/REGION/services/SERVICE_NAME
```

## State and backends

This repo currently contains a local `terraform.tfstate` file in this directory (check/gitignore rules). For production or team use, configure a remote backend (for example, a GCS bucket) to store state securely and enable locking.

### Variables

See `variables.tf` for configurable values. Keep secrets out of source control — prefer using environment variables, a secrets manager, or an encrypted backend.

### Modules

- Reusable modules live under `modules/` (for example `cloudrun/`, `cloudbuild_trigger/`). The top-level `main.tf` composes those modules into the full infrastructure.

### Files of interest

- `main.tf` — primary resource definitions and module usage.
- `variables.tf` — variable definitions.
- `terraform.tfvars` — local variable values (not committed with secrets).
- `modules/` — modular components used by the configuration.

### Notes

- Do not commit secrets or long-lived credentials. Add `terraform.tfstate` and any files with secrets to `.gitignore`.
- Use `terraform fmt` and `terraform validate` before committing changes.

### CI / automation

The repo contains Terraform files suitable for automation via CI (Cloud Build or GitHub Actions). Ensure service account credentials used by CI have least privilege required.
