# Real-Time Order Processing System

## Overview
A 3-tier cloud-native application demonstrating scalable backend processing and observability.

## Architecture
Frontend → Backend → Redis Queue → Worker → PostgreSQL

## Key Features
- Asynchronous job processing
- Scalable worker architecture
- Metrics exposed for monitoring
- Clean separation of tiers

## DevOps Integration (Conceptual)
- Terraform provisions infrastructure
- Docker containerizes services
- Kubernetes orchestrates workloads
- Jenkins automates CI/CD
- Prometheus collects metrics
- Grafana visualizes system performance

## Observability
Metrics exposed at:
- /metrics

Tracked:
- Total requests
- Orders processed

## Scalability
- Worker pods scale horizontally
- Queue ensures load balancing