import React from 'react';
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


export const FaqContent = () => {

    return (
      <div className="faq">
          <div className = "faq__item">
              <h6 className="faq__title">
                What's this?
              </h6>
              <div className="faq__text">
                  <p>Atr<b>app</b>os is a simple crowdsourcing mapmaking app.</p>
                  <p>You can create meaningful maps for other urban pedestrians, by drawing paths.</p>
                  <p>You can also see other people's paths, so this is a noble exchange with the walking community.</p>
              </div>
          </div>
          <div className = "faq__item">
              <h6 className="faq__title">
                  What should I do?
              </h6>
              <div className="faq__text">
                  <p>Draw paths, evaluate them, and enjoy!</p>
              </div>
          </div>
          <div className = "faq__item">
              <h6 className="faq__title">
                  Evaluate...?
              </h6>
              <div className="faq__text">
                  <p>You will have two <i>required</i> evaluating options: How walkable and how beautiful is the path.</p>
                  <p>The first one will create thicker paths on the map (the more walkable, the more thick).</p>
                  <p>The second one will create paths with different colors (depending on the level of 'beauty').</p>
                  <p>More information included in each area of interest!</p>
              </div>
          </div>
          <div className = "faq__item">
              <h6 className="faq__title">
                  But this is my desktop/laptop, how...?
              </h6>
              <div className="faq__text">
                  <p>
                      This app is the 'personal computer' version. You can create paths in trails that you know already (you have been there).
                      If you want to explore the possibility of creating a path in a place where you have never been, you can always use the 'Street View'
                      (bottom-right corner of the map) to check the area and then draw and evaluate it at your own accordance.
                  </p>
              </div>
          </div>
          <div className = "faq__item">
              <h6 className="faq__title">
                  As far as paths are concerned...
              </h6>
              <div className="faq__text">
                  <p>
                    You can <i>create, view, edit and delete</i> your own paths. You can only <i>view</i> other people's paths (you should be able to see those meaningful map creations, right?).
                  </p>
              </div>
          </div>
          <div className = "faq__item">
              <h6 className="faq__title">
                  <b>Important info</b>
              </h6>
              <div className="faq__text">
                  <p>
                    You will be able to see the following button at certain places:
                    <span className="faq__tltp">
                           <FontAwesomeIcon icon={faInfoCircle} />
                    </span>
                  </p>
                  <p> Please <i><b className="important-notice">do not ignore this button!</b></i> It may contain
                       useful information for the usage of a nearby element! Trust the info buttons.
                       They exist for your own good <b>:)</b>
                  </p>
              </div>
          </div>
          <div className = "faq__item">
              <h6 className="faq__title">
                  <b>Not-clickable elements (buttons, links, etc...)</b>
              </h6>
              <div className="faq__text">
                  <p>
                      If an element is not clickable, then we regret that <i>it is not supposed to be</i>.
                      <br/>This is not a reason to get confused, try to perceive the surroundings and
                      your options, then ensure that nothing necessary is missing. Sometimes this happens for your own protection.
                      A button/link may be disabled because if it was clicked, the universe would explode <b>D:</b>
                  </p>
              </div>
          </div>
          <div className = "faq__item">
              <h6 className="faq__title">
                 Search
              </h6>
              <div className="faq__text">
                  This option (top right corner of the map, below the zoom options)
                  <br/><div className="bg-map_search bg-faq">
                  </div><br/>
                  ...opens a search box. There you can search any area and then focus on it in the map.
                  After your search, a marker with the area info will appear.
                  You can hide this marker by closing the search box (the area will stay focused).
              </div>
          </div>
          <div className = "faq__item">
              <h5 className="faq__big-title">
                  Creating a path
              </h5>
              <div className="faq__text">
                  <p>
                      Press the button "Create" ("My paths" section) and a creation form will appear.
                       Then, you will have two basic tasks there:
                  </p>
                  <ol>
                      <li>Draw your path</li>
                      <li>Evaluate your path</li>
                  </ol>
                  <p>(The order can be vice versa)</p>
                  For drawing your path, you should first press the button "Draw".
                   Then, before/during/after the actual 'drawing' action you will have the following toolbar options available:
                  <br/><div className="bg-map_draw_toolbar bg-faq">
                  </div><br/>
                    More specifically:
                  <ol>
                      <li>
                          <i>Finish</i>: Finishes your drawing.
                      </li>
                      <li>
                          <i>Delete last point</i>: Removes the last point of your path (last clicked area).
                      </li>
                      <li>
                          <i>Cancel</i>: Cancels everything, the path should no longer exist after this.
                      </li>
                  </ol>
                  <p>
                      <b>Evaluation</b>: <u>Before OR after drawing</u> your path, you can select your path's thickness and color by choosing an option from the available drop-downs (walkability and landscape criteria).
                       <i> Please read the info next to them</i> to make an accurate evaluation.
                      <b className="important-notice"> Always submit your evaluation after selecting an option at the drop-downs</b>. This way you will be able to see the visual outcome in the map (new thickness/color of the path).
                      Also, <b className="important-notice">you will not be able to save your path if no evaluation is submitted.<br/>
                      If you change an existing evaluation, if you don't press 'submit', your path won't be saved with the new one.</b>
                      </p>
                  <p>
                    <b>Naming the path</b>:  A default name should appear for every new path. Feel free to change it. But it should not be blank, otherwise you won't be able to save your path.
                  </p>
                  <p>
                      <b>Editing the path:</b> This button just changes <i>the shape</i> of your path. You won't be able to add new points to the polyline (=drawn path). If you are not content with your drawing then you should try the following option.
                  </p>
                  <p>
                      <b>Erasing a path:</b> After clicking the button erase, you can remove the path from the map by clicking it. Also you will have the following toolbar options available:
                  </p>
                  <div className="bg-map_erase_toolbar bg-faq">
                  </div><br/>
                      More specifically:
                      <ol>
                          <li>
                              <i>Finish</i>: Finishes your erasure (or non-erasure, whatever you did).
                          </li>
                          <li>
                              <i>Cancel</i>: Cancels erasing actions (nothing happens).
                          </li>
                          <li>
                              <i>Clear all</i>: Clears the map (removes your path from the map).
                          </li>
                      </ol>
                      <p>
                          <b className="important-notice">Please do not confuse 'Erase' with deleting an existing path. 'Erase' button clears the map.
                              The delete button (available in your path list for each path) deletes a path permanently.
                          </b>
                      </p>
                      <p>
                          <b>Adding a tag (description)</b>: This is optional. However, we do encourage you to add any further useful information concerning your path.
                      </p>
                      <p><b>Saving your path</b>: If everything is ready, you should be able to save your path.
                          If the button is not enabled, then something will be missing. Please check all the required fields (blank name? No evaluation? <i>No path in the map?</i>) and try again.
                      </p>

              </div>
          </div>
          <div className = "faq__item">
              <h5 className="faq__big-title">
                  My paths (path list)
              </h5>
              <div className="faq__text">
                  <p>There, you can see a few statistics (dashboard) of your created paths, your path list, and filtering options.</p>
                  <p>The paths are clickable in this list, so that you can instantly see a few characteristics of each path. </p>
                  <p>There are also  three buttons available for each path: </p>
                  <ol>
                      <li><i>View</i>: Shows the path in the map, with markers at the beginning and the end. The path in the map is clickable also.
                          Click again this button to hide the path from the map.
                      </li>
                      <li><i>Modify</i>: By clicking this button, a new view will appear. It is similar with the 'Create' view. However, in this view,
                           the 'Erase' button is not available. If you want to remove a path from the list, you can always delete it. Last
                          but not least, in order to save a modified path, a change should take place (name? evaluation? <i>path shape?</i>).
                      </li>
                      <li><i>Delete</i>: The name says it all, it just deletes a path forever. Do not worry, a confirmation will appear in case you click it by mistake.
                      </li>
                  </ol>
              </div>
          </div>
          <div className = "faq__item">
              <h6 className="faq__title">
                  Show all in the map
              </h6>
              <div className="faq__text">
                  This options selects automatically all the paths in your list and shows them in the map.
              </div>
          </div>
          <div className = "faq__item">
              <h6 className="faq__title">
                  Filter selections
              </h6>
              <div className="faq__text">
                  Enables the below checkable options, so that you will be able to filter your paths accordingly.
                   They will be selected automatically and then become visible in the map.
              </div>
          </div>
          <div className = "faq__item">
              <h5 className="faq__big-title">
                  Community
              </h5>
              <div className="faq__text">
                  Here you can see the community paths (created by other users).
                  The options are similar to 'My paths'. However, the 'edit' and 'delete' buttons are not available in the path list.
                  Also, you can include (or not) your own paths in this list.
                  If you decide to include your paths in the community list, they will appear with an extra blue line on their left,
                  so that you can distinguish them.
              </div>
          </div>
          <div className = "faq__item">
              <h5 className="faq__big-title">
                  Map
              </h5>
              <div className="faq__text">
                  Here you can see several map previews. You can select anyone in order to
                  change your map's appearance.
                  You can change the map's style whenever you want. Select a map that suits you best!
              </div>
          </div>
          <div className = "faq__item">
              <h5 className="faq__big-title">
                  Epilogue
              </h5>
              <div className="faq__text">
                  That's all folks. If you managed to reach the bottom of this FAQ, you have the eternal gratitude of the unicorn cat:
                  <br/><div className="bg-unicorn_cat bg-faq">
              </div><br/>
                  <b className="important-notice">
                      Thank you :)
                  </b>
              </div>
          </div>
      </div>
    );
};
