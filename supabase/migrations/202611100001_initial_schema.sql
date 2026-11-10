
-- FundTrack initial database schema

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Organizations
CREATE TABLE public.organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(200) NOT NULL,
    base_currency CHAR(3) NOT NULL DEFAULT 'USD',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Organization memberships
CREATE TABLE public.organization_members (
    organization_id UUID NOT NULL
        REFERENCES public.organizations(id),
    user_id UUID NOT NULL
        REFERENCES auth.users(id),
    role VARCHAR(20) NOT NULL DEFAULT 'VIEWER'
        CHECK (role IN ('ADMIN', 'FINANCE', 'VIEWER')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY (organization_id, user_id)
);

-- Donors
CREATE TABLE public.donors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL
        REFERENCES public.organizations(id),
    name VARCHAR(200) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(50),
    description TEXT,
    active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (organization_id, name)
);

-- Enable row-level security
ALTER TABLE public.organizations
    ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.organization_members
    ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.donors
    ENABLE ROW LEVEL SECURITY;

-- A user can read their own memberships
CREATE POLICY "Read own memberships"
ON public.organization_members
FOR SELECT TO authenticated
USING (user_id = (SELECT auth.uid()));

-- Organization members can read their organization
CREATE POLICY "Members can read organizations"
ON public.organizations
FOR SELECT TO authenticated
USING (
    EXISTS (
        SELECT 1
        FROM public.organization_members m
        WHERE m.organization_id = id
          AND m.user_id = (SELECT auth.uid())
    )
);

-- Organization members can read donors
CREATE POLICY "Members can read donors"
ON public.donors
FOR SELECT TO authenticated
USING (
    EXISTS (
        SELECT 1
        FROM public.organization_members m
        WHERE m.organization_id = donors.organization_id
          AND m.user_id = (SELECT auth.uid())
    )
);

CREATE INDEX idx_donors_organization
ON public.donors(organization_id);
