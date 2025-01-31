export default function handler(
  req: any,
  res: { json: (arg0: { token: string | undefined }) => void }
) {
  console.log("Server-side env:", process.env.NEXT_PUBLIC_MAPBOX_TOKEN);
  res.json({ token: process.env.NEXT_PUBLIC_MAPBOX_TOKEN });
}
