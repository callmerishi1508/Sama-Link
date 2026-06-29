from typing import Protocol, Optional

class StorageProviderPort(Protocol):
    """
    Interface for handling unstructured file storage (e.g., images, audio files).
    """

    def store_attachment(self, file_name: str, file_data: bytes, content_type: str) -> str:
        """
        Store a file and return its secure URL or reference URI.
        """
        ...

    def retrieve_attachment(self, uri: str) -> Optional[bytes]:
        """
        Retrieve raw file bytes via its URI.
        """
        ...

    def delete_attachment(self, uri: str) -> bool:
        """
        Remove a file from storage.
        """
        ...
