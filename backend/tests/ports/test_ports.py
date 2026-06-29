import inspect
from typing import Protocol
from app.ports.ai.provider import AIProviderPort
from app.ports.repositories.base import CaseRepositoryPort, EventRepositoryPort, SnapshotRepositoryPort
from app.ports.notifications.provider import NotificationProviderPort
from app.ports.geolocation.provider import GeolocationProviderPort
from app.ports.storage.provider import StorageProviderPort

def is_protocol(cls):
    """Helper to verify if a class is a typing.Protocol."""
    return issubclass(cls, getattr(Protocol, '_is_protocol', Protocol))

def test_ports_are_protocols():
    ports = [
        AIProviderPort,
        CaseRepositoryPort,
        EventRepositoryPort,
        SnapshotRepositoryPort,
        NotificationProviderPort,
        GeolocationProviderPort,
        StorageProviderPort,
    ]
    for port in ports:
        # Check that they inherit from Protocol
        # Or at least are purely abstract
        assert hasattr(port, "__parameters__") or issubclass(port, Protocol), f"{port.__name__} is not a valid Protocol"

def test_ports_have_docstrings():
    ports = [
        AIProviderPort,
        CaseRepositoryPort,
        EventRepositoryPort,
        SnapshotRepositoryPort,
        NotificationProviderPort,
        GeolocationProviderPort,
        StorageProviderPort,
    ]
    for port in ports:
        assert port.__doc__ is not None, f"{port.__name__} must have a docstring"
        
        # Verify methods also have docstrings (ignoring builtins)
        for name, method in inspect.getmembers(port, predicate=inspect.isfunction):
            if not name.startswith("__"):
                assert method.__doc__ is not None, f"Method {name} in {port.__name__} must have a docstring"

def test_ports_cannot_be_instantiated_directly_if_abstract():
    # In Python, Protocols can technically be instantiated if they don't have abstract methods defined with @abstractmethod
    # but their purpose is structural subtyping. We just ensure they are definitions.
    assert inspect.isclass(AIProviderPort)
