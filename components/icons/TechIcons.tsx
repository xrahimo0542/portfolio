import React from 'react';

const GenericIcon: React.FC<React.SVGProps<SVGSVGElement> & { label: string, bgColor?: string }> = ({ label, bgColor = '#475569', ...props }) => (
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect width="32" height="32" rx="4" fill={bgColor} />
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
            {label}
        </text>
    </svg>
);


export const SolidWorksIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <GenericIcon label="SW" bgColor="#da1f26" {...props} />
);

export const AnsysIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <GenericIcon label="An" bgColor="#FFB71B" {...props} />
);

export const MatlabIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <GenericIcon label="M" bgColor="#0076A8" {...props} />
);

export const AutoCadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <GenericIcon label="AC" bgColor="#E24430" {...props} />
);

export const IllustratorIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <GenericIcon label="Ai" bgColor="#FF9A00" {...props} />
);

export const PhotoshopIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <GenericIcon label="Ps" bgColor="#31A8FF" {...props} />
);

export const PremiereProIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <GenericIcon label="Pr" bgColor="#9999FF" {...props} />
);

export const AfterEffectsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <GenericIcon label="Ae" bgColor="#9999FF" {...props} />
);

export const BlenderIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M13.25 4.54a1.5 1.5 0 00-2.498 1.15l-1.04 4.887-3.69-2.273a1.5 1.5 0 00-1.87.27l-1.9 2.13a1.5 1.5 0 00.323 2.316l3.77 2.1.002.002-3.77 2.1a1.5 1.5 0 00-.324 2.316l1.9 2.13a1.5 1.5 0 001.87.27l3.69-2.274 1.04 4.886a1.5 1.5 0 002.498 1.15l8.303-4.755a1.5 1.5 0 000-2.588L13.25 4.54z" fill="#F5792A"></path>
  </svg>
);

export const DefaultIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <GenericIcon label="?" {...props} />
);

export const SKILL_ICONS = {
    'SolidWorks': SolidWorksIcon,
    'ANSYS': AnsysIcon,
    'MATLAB': MatlabIcon,
    'Blender': BlenderIcon,
    'AutoCAD': AutoCadIcon,
    'Illustrator': IllustratorIcon,
    'Photoshop': PhotoshopIcon,
    'Premiere Pro': PremiereProIcon,
    'After Effects': AfterEffectsIcon,
    'Default': DefaultIcon,
};