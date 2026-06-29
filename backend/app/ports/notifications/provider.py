from typing import Protocol

class NotificationProviderPort(Protocol):
    """
    Interface for pushing notifications to human responders and external agencies.
    """

    def notify_family(self, case_id: str, message: str) -> bool:
        """
        Send a notification to registered family members.
        Returns True if successful, False otherwise.
        """
        ...

    def notify_volunteer(self, case_id: str, message: str) -> bool:
        """
        Send a notification to assigned community volunteers.
        """
        ...

    def notify_authority(self, case_id: str, message: str, payload: dict) -> bool:
        """
        Send a structured alert to official authorities (e.g., EMS/Police).
        """
        ...
