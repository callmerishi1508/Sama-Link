from typing import Protocol, Dict, Any, Optional

class GeolocationProviderPort(Protocol):
    """
    Interface for geographical and routing operations.
    """

    def reverse_geocode(self, latitude: float, longitude: float) -> str:
        """
        Convert coordinates into a human-readable address.
        """
        ...

    def find_nearest(self, latitude: float, longitude: float, entity_type: str) -> Optional[Dict[str, Any]]:
        """
        Locate the nearest entity (e.g., hospital, volunteer) to a given coordinate.
        """
        ...

    def estimate_distance(self, origin: str, destination: str) -> float:
        """
        Estimate travel distance or time between two locations.
        """
        ...
