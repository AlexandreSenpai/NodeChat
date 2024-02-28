# built-in
import logging
from typing import Union

# third-party
from sqlalchemy.ext.asyncio import async_sessionmaker
from sqlalchemy.ext.asyncio import create_async_engine, AsyncEngine, AsyncSession, AsyncConnection

class SQLite:
    """Implements the IDatabase interface for SQLite databases.

    This class is responsible for managing SQLite database connections.

    Attributes:
        _connection_str: A string representing the SQLite database connection string.
        _engine: An Engine object for the SQLite database.
        _connection: A Connection object for the SQLite database.
        _session: A Session object for the SQLite database.
    """

    def __init__(self, connection_str: str) -> None:
        """Initializes SQLite with a given connection string.

        Args:
            connection_str: A string representing the SQLite database connection string.
        """
        self._connection_str = connection_str
        self._engine: AsyncEngine = create_async_engine(self._connection_str, echo=False)
        self._connection: Union[AsyncConnection, None] = None
        self._session: Union[None, AsyncSession] = None

    async def __aenter__(self):
        """Context manager enter method to connect to the database."""
        await self.connect()
        return self
    
    async def __aexit__(self, exc_type, exc_value, exc_tb) -> None:
        """Context manager exit method to disconnect from the database."""
        await self.disconnect()

    @property
    def session(self) -> AsyncSession | None:
        return self._session

    async def connect(self) -> Union[AsyncConnection, None]:
        """Connects to the SQLite database.

        Returns:
            A Connection object or None if the connection fails.
        """
        if self._connection:
            return self._connection
        
        try:
            session = async_sessionmaker(self._engine)
            self._session = session()
            self._connection = self._engine.connect()
            logging.info("Database connection stablished successfully!")
            return self._connection
        except Exception as err:
            logging.error(f'Could not create database connection. {err}')
            return None
    
    async def disconnect(self) -> bool:
        """Disconnects from the SQLite database.

        Returns:
            A boolean indicating whether the disconnection was successful.
        """
        if not self._connection: return False

        try:
            await self._connection.close()
            return True
        except Exception as err:
            logging.error(f'Could not disconnect from database. {err}')
            return False