import { toast } from "vue-sonner";

export async function useCurrentLocation() {
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position),
        (error) => reject(error),
      );
    } else {
      reject(() => {
        toast.error(
          "Your browser does not support location services, please update your browser or check your phone's location settings",
        );
      });
    }
  });
}
