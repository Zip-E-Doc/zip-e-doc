package com.zipedoc.web.rest;

import com.zipedoc.domain.SharedUser;
import com.zipedoc.repository.SharedUserRepository;
import com.zipedoc.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.zipedoc.domain.SharedUser}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class SharedUserResource {

    private final Logger log = LoggerFactory.getLogger(SharedUserResource.class);

    private static final String ENTITY_NAME = "sharedUser";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SharedUserRepository sharedUserRepository;

    public SharedUserResource(SharedUserRepository sharedUserRepository) {
        this.sharedUserRepository = sharedUserRepository;
    }

    /**
     * {@code POST  /shared-users} : Create a new sharedUser.
     *
     * @param sharedUser the sharedUser to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new sharedUser, or with status {@code 400 (Bad Request)} if the sharedUser has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/shared-users")
    public ResponseEntity<SharedUser> createSharedUser(@RequestBody SharedUser sharedUser) throws URISyntaxException {
        log.debug("REST request to save SharedUser : {}", sharedUser);
        if (sharedUser.getId() != null) {
            throw new BadRequestAlertException("A new sharedUser cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SharedUser result = sharedUserRepository.save(sharedUser);
        return ResponseEntity
            .created(new URI("/api/shared-users/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /shared-users/:id} : Updates an existing sharedUser.
     *
     * @param id the id of the sharedUser to save.
     * @param sharedUser the sharedUser to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated sharedUser,
     * or with status {@code 400 (Bad Request)} if the sharedUser is not valid,
     * or with status {@code 500 (Internal Server Error)} if the sharedUser couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/shared-users/{id}")
    public ResponseEntity<SharedUser> updateSharedUser(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody SharedUser sharedUser
    ) throws URISyntaxException {
        log.debug("REST request to update SharedUser : {}, {}", id, sharedUser);
        if (sharedUser.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, sharedUser.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!sharedUserRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        SharedUser result = sharedUserRepository.save(sharedUser);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, sharedUser.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /shared-users/:id} : Partial updates given fields of an existing sharedUser, field will ignore if it is null
     *
     * @param id the id of the sharedUser to save.
     * @param sharedUser the sharedUser to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated sharedUser,
     * or with status {@code 400 (Bad Request)} if the sharedUser is not valid,
     * or with status {@code 404 (Not Found)} if the sharedUser is not found,
     * or with status {@code 500 (Internal Server Error)} if the sharedUser couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/shared-users/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<SharedUser> partialUpdateSharedUser(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody SharedUser sharedUser
    ) throws URISyntaxException {
        log.debug("REST request to partial update SharedUser partially : {}, {}", id, sharedUser);
        if (sharedUser.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, sharedUser.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!sharedUserRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<SharedUser> result = sharedUserRepository
            .findById(sharedUser.getId())
            .map(existingSharedUser -> {
                if (sharedUser.getUserName() != null) {
                    existingSharedUser.setUserName(sharedUser.getUserName());
                }

                return existingSharedUser;
            })
            .map(sharedUserRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, sharedUser.getId().toString())
        );
    }

    /**
     * {@code GET  /shared-users} : get all the sharedUsers.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of sharedUsers in body.
     */
    @GetMapping("/shared-users")
    public List<SharedUser> getAllSharedUsers(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all SharedUsers");
        if (eagerload) {
            return sharedUserRepository.findAllWithEagerRelationships();
        } else {
            return sharedUserRepository.findAll();
        }
    }

    /**
     * {@code GET  /shared-users/:id} : get the "id" sharedUser.
     *
     * @param id the id of the sharedUser to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the sharedUser, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/shared-users/{id}")
    public ResponseEntity<SharedUser> getSharedUser(@PathVariable Long id) {
        log.debug("REST request to get SharedUser : {}", id);
        Optional<SharedUser> sharedUser = sharedUserRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(sharedUser);
    }

    /**
     * {@code DELETE  /shared-users/:id} : delete the "id" sharedUser.
     *
     * @param id the id of the sharedUser to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/shared-users/{id}")
    public ResponseEntity<Void> deleteSharedUser(@PathVariable Long id) {
        log.debug("REST request to delete SharedUser : {}", id);
        sharedUserRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
