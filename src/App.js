import React, { useEffect } from 'react';
import './App.css';
import CreateShukka from './components/shukka/create/CreateShukka';
import TableShukkaList from './components/shukka/list/detailList/TableShukkaList';
import SearchShukkaList from './components/shukka/list/SearchShukkaList';

function App() {

  useEffect(() => {
    const checkAll = document.getElementById('check-all');
    const checkboxes = document.querySelectorAll('tbody input[type="checkbox"]');
    const showSearchButton = document.querySelector('.show-search-advanced');
    const searchAdvanced = document.querySelector('.search-advanced');
    const popupCreate = document.querySelector('.popup-create');
    const closePopup = document.querySelector('.close-btn');
    const closePopupCancel = document.querySelector('.btn-cancel');
    const createPopup = document.querySelector('.shukka-jisseki-btn');
    const createBtnAdvanced = document.querySelector('.btn-show-advanced-popup');
    const createDisplayAdvanced = document.querySelector('.create-header-advanced');

    // Functionality for checkAll checkbox
    const handleCheckAllChange = () => {
      checkboxes.forEach((checkbox) => {
        checkbox.checked = checkAll.checked;
      });
    };

    const handleCheckboxChange = (event) => {
      if (!event.target.checked) {
        checkAll.checked = false;
      } else if (Array.from(checkboxes).every((checkbox) => checkbox.checked)) {
        checkAll.checked = true;
      }
    };

    if (checkAll) {
      checkAll.addEventListener('change', handleCheckAllChange);
    }
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener('change', handleCheckboxChange);
    });

    // Functionality for show/hide searchAdvanced
    const handleShowSearchButtonClick = () => {
      if (searchAdvanced.classList.contains('show')) {
        searchAdvanced.classList.remove('show');
        setTimeout(() => {
          searchAdvanced.style.display = 'none';
        }, 500);
      } else {
        searchAdvanced.style.display = 'flex';
        setTimeout(() => {
          searchAdvanced.classList.add('show');
        }, 10);
      }
    };

    if (showSearchButton) {
      showSearchButton.addEventListener('click', handleShowSearchButtonClick);
    }

    // Functionality for show/hide popup create

    const resetCreateFields = () => {
      // Reset all inputs and selects in the popup create
      const inputs = document.querySelectorAll('.popup-create input');
      const selects = document.querySelectorAll('.popup-create select');
      inputs.forEach(input => {
        if (input.type === 'checkbox') {
          input.checked = false; // Reset checkboxes
        } else {
          input.value = ''; // Reset other input types
        }
      });
      selects.forEach(select => {
        select.selectedIndex = 0; // Reset select dropdowns
      });

      // Reset table columns
      const tableCells = document.querySelectorAll('#table-create-shukka tbody tr');
      tableCells.forEach(row => {
        const inputsInRow = row.querySelectorAll('input[type="text"], input[type="number"]');
        const selectsInRow = row.querySelectorAll('select');
        inputsInRow.forEach(input => {
          input.value = ''; // Reset input values in each row
        });
        selectsInRow.forEach(select => {
          select.selectedIndex = 0; // Reset select values in each row
        });
      });
    };



    const handleClosePopupClick = () => {
      popupCreate.classList.remove('show');
      setTimeout(() => {
        resetCreateFields();
        popupCreate.style.display = 'none';
      }, 500);
    };

    const handleClosePopupCancelClick = () => {
      popupCreate.classList.remove('show');
      setTimeout(() => {
        resetCreateFields();
        popupCreate.style.display = 'none';
      }, 500);
    };

    const handleCreatePopupClick = () => {
      popupCreate.style.display = 'block';
      setTimeout(() => {
        popupCreate.classList.add('show');
      }, 10);
    };

    if (closePopup) {
      closePopup.addEventListener('click', handleClosePopupClick);
    }
    if (closePopupCancel) {
      closePopupCancel.addEventListener('click', handleClosePopupCancelClick);
    }
    if (createPopup) {
      createPopup.addEventListener('click', handleCreatePopupClick);
    }

    // Functionality for show/hide button advanced popup create
    const handleCreateBtnAdvancedClick = () => {
      if (createDisplayAdvanced.classList.contains('show')) {
        createDisplayAdvanced.classList.remove('show');
        setTimeout(() => {
          createDisplayAdvanced.style.display = 'none';
        }, 500);
      } else {
        createDisplayAdvanced.style.display = 'block';
        setTimeout(() => {
          createDisplayAdvanced.classList.add('show');
        }, 10);
      }
    };

    if (createBtnAdvanced) {
      createBtnAdvanced.addEventListener('click', handleCreateBtnAdvancedClick);
    }

    // Cleanup event listeners on unmount
    return () => {
      if (checkAll) {
        checkAll.removeEventListener('change', handleCheckAllChange);
      }
      checkboxes.forEach((checkbox) => {
        checkbox.removeEventListener('change', handleCheckboxChange);
      });
      if (showSearchButton) {
        showSearchButton.removeEventListener('click', handleShowSearchButtonClick);
      }
      if (closePopup) {
        closePopup.removeEventListener('click', handleClosePopupClick);
      }
      if (createPopup) {
        createPopup.removeEventListener('click', handleCreatePopupClick);
      }
      if (createBtnAdvanced) {
        createBtnAdvanced.removeEventListener('click', handleCreateBtnAdvancedClick);
      }
    };
  }, []);

  return (
    <div>
      {/* <!-- header start --> */}
      <div className="header">
        <div className="logo">
          <img src='static/img/eeeCloud_logo_header.png' alt="eeeCloud Logo" />
          <button className="standard">Standard</button>
        </div>
        <div className="userLogin">
          <p>ログインユーザー：kashiwazaki</p>
          <button className="user-logout">ログアウト</button>
        </div>
      </div>
      {/* <!-- header end --> */}
      <div className="container">

        <div className='navbar'>

        </div>
        <div className='body-list'>



          {/* <!-- display start --> */}
          <div className="display">

            <div className="header-body">
              <div className="title">
                <h1><span>●</span>出荷一覧</h1>
              </div>
              <button className="shukka-jisseki-btn">出荷登録</button>
            </div>

            {/* <!-- display search start --> */}
            <SearchShukkaList />
            {/* <!-- display search end --> */}

            {/* <!-- display table start --> */}
            <TableShukkaList />
            {/* <!-- display table end --> */}

          </div>
          {/* <!-- display end --> */}

          {/* <!-- popup create start --> */}
          <CreateShukka />
          {/* <!-- popup create end --> */}
        </div>
      </div>
    </div>
  );
}

export default App;
