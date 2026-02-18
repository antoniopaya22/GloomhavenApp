import React from 'react';
import { View } from 'react-native';
import Svg, {
  Defs,
  RadialGradient,
  LinearGradient,
  Stop,
  Circle,
  Path,
  G,
  Polygon,
  Line,
} from 'react-native-svg';

interface GloomhavenLogoProps {
  size?: number;
}

/**
 * Gloomhaven Enemy Manager Logo
 *
 * A dark-fantasy styled logo featuring:
 * - Hexagonal outer frame with gold border
 * - Radial gradient dark background
 * - Stylized skull silhouette
 * - Shield overlay
 * - Crossed swords behind the shield
 * - Decorative corner accents
 */
export default function GloomhavenLogo({ size = 160 }: GloomhavenLogoProps) {
  const s = size;
  const cx = s / 2;
  const cy = s / 2;

  // Hexagon points helper
  const hexPoints = (centerX: number, centerY: number, radius: number) => {
    const pts: string[] = [];
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i - Math.PI / 2;
      pts.push(
        `${centerX + radius * Math.cos(angle)},${centerY + radius * Math.sin(angle)}`
      );
    }
    return pts.join(' ');
  };

  return (
    <View style={{ width: s, height: s }}>
      <Svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
        <Defs>
          {/* Background radial glow */}
          <RadialGradient id="bgGlow" cx="50%" cy="50%" r="50%">
            <Stop offset="0%" stopColor="#3d2912" stopOpacity={0.9} />
            <Stop offset="60%" stopColor="#1a1410" stopOpacity={0.95} />
            <Stop offset="100%" stopColor="#0d0a08" stopOpacity={1} />
          </RadialGradient>

          {/* Gold gradient for borders */}
          <LinearGradient id="goldBorder" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#f3d98b" />
            <Stop offset="30%" stopColor="#d4a438" />
            <Stop offset="50%" stopColor="#f9ecc4" />
            <Stop offset="70%" stopColor="#d4a438" />
            <Stop offset="100%" stopColor="#9a6a21" />
          </LinearGradient>

          {/* Gold gradient for the skull */}
          <LinearGradient id="goldSkull" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#f3d98b" />
            <Stop offset="50%" stopColor="#d4a438" />
            <Stop offset="100%" stopColor="#9a6a21" />
          </LinearGradient>

          {/* Sword blade gradient */}
          <LinearGradient id="blade" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#c4b8aa" />
            <Stop offset="50%" stopColor="#8a7d6f" />
            <Stop offset="100%" stopColor="#5c3d1a" />
          </LinearGradient>

          {/* Inner shadow gradient */}
          <RadialGradient id="innerShadow" cx="50%" cy="65%" r="45%">
            <Stop offset="0%" stopColor="#0d0a08" stopOpacity={0} />
            <Stop offset="100%" stopColor="#0d0a08" stopOpacity={0.7} />
          </RadialGradient>
        </Defs>

        {/* ====== OUTER HEXAGON ====== */}
        <Polygon
          points={hexPoints(cx, cy, s * 0.48)}
          fill="url(#bgGlow)"
          stroke="url(#goldBorder)"
          strokeWidth={s * 0.025}
          strokeLinejoin="round"
        />

        {/* Inner hexagon border (decorative double border) */}
        <Polygon
          points={hexPoints(cx, cy, s * 0.42)}
          fill="none"
          stroke="#9a6a21"
          strokeWidth={s * 0.006}
          strokeLinejoin="round"
          opacity={0.5}
        />

        {/* ====== CROSSED SWORDS ====== */}
        <G opacity={0.35}>
          {/* Left sword */}
          <Line
            x1={cx - s * 0.28}
            y1={cy + s * 0.28}
            x2={cx + s * 0.12}
            y2={cy - s * 0.28}
            stroke="url(#blade)"
            strokeWidth={s * 0.018}
            strokeLinecap="round"
          />
          {/* Left sword guard */}
          <Line
            x1={cx - s * 0.16}
            y1={cy + s * 0.08}
            x2={cx - s * 0.06}
            y2={cy + s * 0.18}
            stroke="#d4a438"
            strokeWidth={s * 0.015}
            strokeLinecap="round"
          />

          {/* Right sword */}
          <Line
            x1={cx + s * 0.28}
            y1={cy + s * 0.28}
            x2={cx - s * 0.12}
            y2={cy - s * 0.28}
            stroke="url(#blade)"
            strokeWidth={s * 0.018}
            strokeLinecap="round"
          />
          {/* Right sword guard */}
          <Line
            x1={cx + s * 0.16}
            y1={cy + s * 0.08}
            x2={cx + s * 0.06}
            y2={cy + s * 0.18}
            stroke="#d4a438"
            strokeWidth={s * 0.015}
            strokeLinecap="round"
          />
        </G>

        {/* ====== SHIELD SHAPE ====== */}
        <Path
          d={`M ${cx} ${cy - s * 0.24}
              C ${cx + s * 0.22} ${cy - s * 0.22}, ${cx + s * 0.24} ${cy - s * 0.08}, ${cx + s * 0.22} ${cy + s * 0.06}
              C ${cx + s * 0.18} ${cy + s * 0.18}, ${cx + s * 0.08} ${cy + s * 0.28}, ${cx} ${cy + s * 0.32}
              C ${cx - s * 0.08} ${cy + s * 0.28}, ${cx - s * 0.18} ${cy + s * 0.18}, ${cx - s * 0.22} ${cy + s * 0.06}
              C ${cx - s * 0.24} ${cy - s * 0.08}, ${cx - s * 0.22} ${cy - s * 0.22}, ${cx} ${cy - s * 0.24} Z`}
          fill="#1a1410"
          stroke="url(#goldBorder)"
          strokeWidth={s * 0.02}
          strokeLinejoin="round"
        />

        {/* Shield inner border */}
        <Path
          d={`M ${cx} ${cy - s * 0.2}
              C ${cx + s * 0.18} ${cy - s * 0.18}, ${cx + s * 0.2} ${cy - s * 0.06}, ${cx + s * 0.18} ${cy + s * 0.05}
              C ${cx + s * 0.15} ${cy + s * 0.15}, ${cx + s * 0.07} ${cy + s * 0.23}, ${cx} ${cy + s * 0.27}
              C ${cx - s * 0.07} ${cy + s * 0.23}, ${cx - s * 0.15} ${cy + s * 0.15}, ${cx - s * 0.18} ${cy + s * 0.05}
              C ${cx - s * 0.2} ${cy - s * 0.06}, ${cx - s * 0.18} ${cy - s * 0.18}, ${cx} ${cy - s * 0.2} Z`}
          fill="none"
          stroke="#5c3d1a"
          strokeWidth={s * 0.005}
          opacity={0.6}
        />

        {/* ====== SKULL ====== */}
        <G>
          {/* Skull cranium */}
          <Circle
            cx={cx}
            cy={cy - s * 0.04}
            r={s * 0.1}
            fill="url(#goldSkull)"
          />

          {/* Jaw / lower face */}
          <Path
            d={`M ${cx - s * 0.07} ${cy + s * 0.02}
                Q ${cx - s * 0.06} ${cy + s * 0.12}, ${cx} ${cy + s * 0.14}
                Q ${cx + s * 0.06} ${cy + s * 0.12}, ${cx + s * 0.07} ${cy + s * 0.02}`}
            fill="url(#goldSkull)"
          />

          {/* Left eye socket */}
          <Circle
            cx={cx - s * 0.04}
            cy={cy - s * 0.05}
            r={s * 0.028}
            fill="#0d0a08"
          />

          {/* Right eye socket */}
          <Circle
            cx={cx + s * 0.04}
            cy={cy - s * 0.05}
            r={s * 0.028}
            fill="#0d0a08"
          />

          {/* Eye glow left */}
          <Circle
            cx={cx - s * 0.04}
            cy={cy - s * 0.05}
            r={s * 0.015}
            fill="#dc4545"
            opacity={0.8}
          />

          {/* Eye glow right */}
          <Circle
            cx={cx + s * 0.04}
            cy={cy - s * 0.05}
            r={s * 0.015}
            fill="#dc4545"
            opacity={0.8}
          />

          {/* Nose cavity */}
          <Path
            d={`M ${cx} ${cy + s * 0.0}
                L ${cx - s * 0.015} ${cy + s * 0.04}
                L ${cx + s * 0.015} ${cy + s * 0.04} Z`}
            fill="#0d0a08"
          />

          {/* Teeth line */}
          <Line
            x1={cx - s * 0.04}
            y1={cy + s * 0.07}
            x2={cx + s * 0.04}
            y2={cy + s * 0.07}
            stroke="#0d0a08"
            strokeWidth={s * 0.005}
          />
          {/* Tooth gaps */}
          <Line
            x1={cx - s * 0.02}
            y1={cy + s * 0.06}
            x2={cx - s * 0.02}
            y2={cy + s * 0.08}
            stroke="#0d0a08"
            strokeWidth={s * 0.004}
          />
          <Line
            x1={cx}
            y1={cy + s * 0.06}
            x2={cx}
            y2={cy + s * 0.08}
            stroke="#0d0a08"
            strokeWidth={s * 0.004}
          />
          <Line
            x1={cx + s * 0.02}
            y1={cy + s * 0.06}
            x2={cx + s * 0.02}
            y2={cy + s * 0.08}
            stroke="#0d0a08"
            strokeWidth={s * 0.004}
          />
        </G>

        {/* Inner shadow overlay on shield */}
        <Path
          d={`M ${cx} ${cy - s * 0.24}
              C ${cx + s * 0.22} ${cy - s * 0.22}, ${cx + s * 0.24} ${cy - s * 0.08}, ${cx + s * 0.22} ${cy + s * 0.06}
              C ${cx + s * 0.18} ${cy + s * 0.18}, ${cx + s * 0.08} ${cy + s * 0.28}, ${cx} ${cy + s * 0.32}
              C ${cx - s * 0.08} ${cy + s * 0.28}, ${cx - s * 0.18} ${cy + s * 0.18}, ${cx - s * 0.22} ${cy + s * 0.06}
              C ${cx - s * 0.24} ${cy - s * 0.08}, ${cx - s * 0.22} ${cy - s * 0.22}, ${cx} ${cy - s * 0.24} Z`}
          fill="url(#innerShadow)"
        />

        {/* ====== DECORATIVE CORNER DIAMONDS ====== */}
        {/* Top diamond */}
        <Polygon
          points={`${cx},${cy - s * 0.44} ${cx + s * 0.02},${cy - s * 0.41} ${cx},${cy - s * 0.38} ${cx - s * 0.02},${cy - s * 0.41}`}
          fill="#d4a438"
          opacity={0.8}
        />
        {/* Bottom diamond */}
        <Polygon
          points={`${cx},${cy + s * 0.44} ${cx + s * 0.02},${cy + s * 0.41} ${cx},${cy + s * 0.38} ${cx - s * 0.02},${cy + s * 0.41}`}
          fill="#d4a438"
          opacity={0.8}
        />
      </Svg>
    </View>
  );
}
