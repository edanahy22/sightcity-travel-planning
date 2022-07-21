const delButtonHandler = async (trip_id) => {
 
  if (trip_id) {
    const id = trip_id;

    const response = await fetch(`/api/trip/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete project');
    }
  }
};

