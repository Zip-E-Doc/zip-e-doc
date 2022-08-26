package com.zipedoc.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.zipedoc.IntegrationTest;
import com.zipedoc.domain.SharedUser;
import com.zipedoc.repository.SharedUserRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link SharedUserResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class SharedUserResourceIT {

    private static final String DEFAULT_USER_NAME = "AAAAAAAAAA";
    private static final String UPDATED_USER_NAME = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/shared-users";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private SharedUserRepository sharedUserRepository;

    @Mock
    private SharedUserRepository sharedUserRepositoryMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restSharedUserMockMvc;

    private SharedUser sharedUser;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SharedUser createEntity(EntityManager em) {
        SharedUser sharedUser = new SharedUser().userName(DEFAULT_USER_NAME);
        return sharedUser;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SharedUser createUpdatedEntity(EntityManager em) {
        SharedUser sharedUser = new SharedUser().userName(UPDATED_USER_NAME);
        return sharedUser;
    }

    @BeforeEach
    public void initTest() {
        sharedUser = createEntity(em);
    }

    @Test
    @Transactional
    void createSharedUser() throws Exception {
        int databaseSizeBeforeCreate = sharedUserRepository.findAll().size();
        // Create the SharedUser
        restSharedUserMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(sharedUser)))
            .andExpect(status().isCreated());

        // Validate the SharedUser in the database
        List<SharedUser> sharedUserList = sharedUserRepository.findAll();
        assertThat(sharedUserList).hasSize(databaseSizeBeforeCreate + 1);
        SharedUser testSharedUser = sharedUserList.get(sharedUserList.size() - 1);
        assertThat(testSharedUser.getUserName()).isEqualTo(DEFAULT_USER_NAME);
    }

    @Test
    @Transactional
    void createSharedUserWithExistingId() throws Exception {
        // Create the SharedUser with an existing ID
        sharedUser.setId(1L);

        int databaseSizeBeforeCreate = sharedUserRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restSharedUserMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(sharedUser)))
            .andExpect(status().isBadRequest());

        // Validate the SharedUser in the database
        List<SharedUser> sharedUserList = sharedUserRepository.findAll();
        assertThat(sharedUserList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllSharedUsers() throws Exception {
        // Initialize the database
        sharedUserRepository.saveAndFlush(sharedUser);

        // Get all the sharedUserList
        restSharedUserMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(sharedUser.getId().intValue())))
            .andExpect(jsonPath("$.[*].userName").value(hasItem(DEFAULT_USER_NAME)));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllSharedUsersWithEagerRelationshipsIsEnabled() throws Exception {
        when(sharedUserRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restSharedUserMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(sharedUserRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllSharedUsersWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(sharedUserRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restSharedUserMockMvc.perform(get(ENTITY_API_URL + "?eagerload=false")).andExpect(status().isOk());
        verify(sharedUserRepositoryMock, times(1)).findAll(any(Pageable.class));
    }

    @Test
    @Transactional
    void getSharedUser() throws Exception {
        // Initialize the database
        sharedUserRepository.saveAndFlush(sharedUser);

        // Get the sharedUser
        restSharedUserMockMvc
            .perform(get(ENTITY_API_URL_ID, sharedUser.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(sharedUser.getId().intValue()))
            .andExpect(jsonPath("$.userName").value(DEFAULT_USER_NAME));
    }

    @Test
    @Transactional
    void getNonExistingSharedUser() throws Exception {
        // Get the sharedUser
        restSharedUserMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewSharedUser() throws Exception {
        // Initialize the database
        sharedUserRepository.saveAndFlush(sharedUser);

        int databaseSizeBeforeUpdate = sharedUserRepository.findAll().size();

        // Update the sharedUser
        SharedUser updatedSharedUser = sharedUserRepository.findById(sharedUser.getId()).get();
        // Disconnect from session so that the updates on updatedSharedUser are not directly saved in db
        em.detach(updatedSharedUser);
        updatedSharedUser.userName(UPDATED_USER_NAME);

        restSharedUserMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedSharedUser.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedSharedUser))
            )
            .andExpect(status().isOk());

        // Validate the SharedUser in the database
        List<SharedUser> sharedUserList = sharedUserRepository.findAll();
        assertThat(sharedUserList).hasSize(databaseSizeBeforeUpdate);
        SharedUser testSharedUser = sharedUserList.get(sharedUserList.size() - 1);
        assertThat(testSharedUser.getUserName()).isEqualTo(UPDATED_USER_NAME);
    }

    @Test
    @Transactional
    void putNonExistingSharedUser() throws Exception {
        int databaseSizeBeforeUpdate = sharedUserRepository.findAll().size();
        sharedUser.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSharedUserMockMvc
            .perform(
                put(ENTITY_API_URL_ID, sharedUser.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(sharedUser))
            )
            .andExpect(status().isBadRequest());

        // Validate the SharedUser in the database
        List<SharedUser> sharedUserList = sharedUserRepository.findAll();
        assertThat(sharedUserList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchSharedUser() throws Exception {
        int databaseSizeBeforeUpdate = sharedUserRepository.findAll().size();
        sharedUser.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSharedUserMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(sharedUser))
            )
            .andExpect(status().isBadRequest());

        // Validate the SharedUser in the database
        List<SharedUser> sharedUserList = sharedUserRepository.findAll();
        assertThat(sharedUserList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamSharedUser() throws Exception {
        int databaseSizeBeforeUpdate = sharedUserRepository.findAll().size();
        sharedUser.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSharedUserMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(sharedUser)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the SharedUser in the database
        List<SharedUser> sharedUserList = sharedUserRepository.findAll();
        assertThat(sharedUserList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateSharedUserWithPatch() throws Exception {
        // Initialize the database
        sharedUserRepository.saveAndFlush(sharedUser);

        int databaseSizeBeforeUpdate = sharedUserRepository.findAll().size();

        // Update the sharedUser using partial update
        SharedUser partialUpdatedSharedUser = new SharedUser();
        partialUpdatedSharedUser.setId(sharedUser.getId());

        partialUpdatedSharedUser.userName(UPDATED_USER_NAME);

        restSharedUserMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedSharedUser.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedSharedUser))
            )
            .andExpect(status().isOk());

        // Validate the SharedUser in the database
        List<SharedUser> sharedUserList = sharedUserRepository.findAll();
        assertThat(sharedUserList).hasSize(databaseSizeBeforeUpdate);
        SharedUser testSharedUser = sharedUserList.get(sharedUserList.size() - 1);
        assertThat(testSharedUser.getUserName()).isEqualTo(UPDATED_USER_NAME);
    }

    @Test
    @Transactional
    void fullUpdateSharedUserWithPatch() throws Exception {
        // Initialize the database
        sharedUserRepository.saveAndFlush(sharedUser);

        int databaseSizeBeforeUpdate = sharedUserRepository.findAll().size();

        // Update the sharedUser using partial update
        SharedUser partialUpdatedSharedUser = new SharedUser();
        partialUpdatedSharedUser.setId(sharedUser.getId());

        partialUpdatedSharedUser.userName(UPDATED_USER_NAME);

        restSharedUserMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedSharedUser.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedSharedUser))
            )
            .andExpect(status().isOk());

        // Validate the SharedUser in the database
        List<SharedUser> sharedUserList = sharedUserRepository.findAll();
        assertThat(sharedUserList).hasSize(databaseSizeBeforeUpdate);
        SharedUser testSharedUser = sharedUserList.get(sharedUserList.size() - 1);
        assertThat(testSharedUser.getUserName()).isEqualTo(UPDATED_USER_NAME);
    }

    @Test
    @Transactional
    void patchNonExistingSharedUser() throws Exception {
        int databaseSizeBeforeUpdate = sharedUserRepository.findAll().size();
        sharedUser.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSharedUserMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, sharedUser.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(sharedUser))
            )
            .andExpect(status().isBadRequest());

        // Validate the SharedUser in the database
        List<SharedUser> sharedUserList = sharedUserRepository.findAll();
        assertThat(sharedUserList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchSharedUser() throws Exception {
        int databaseSizeBeforeUpdate = sharedUserRepository.findAll().size();
        sharedUser.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSharedUserMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(sharedUser))
            )
            .andExpect(status().isBadRequest());

        // Validate the SharedUser in the database
        List<SharedUser> sharedUserList = sharedUserRepository.findAll();
        assertThat(sharedUserList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamSharedUser() throws Exception {
        int databaseSizeBeforeUpdate = sharedUserRepository.findAll().size();
        sharedUser.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSharedUserMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(sharedUser))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the SharedUser in the database
        List<SharedUser> sharedUserList = sharedUserRepository.findAll();
        assertThat(sharedUserList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteSharedUser() throws Exception {
        // Initialize the database
        sharedUserRepository.saveAndFlush(sharedUser);

        int databaseSizeBeforeDelete = sharedUserRepository.findAll().size();

        // Delete the sharedUser
        restSharedUserMockMvc
            .perform(delete(ENTITY_API_URL_ID, sharedUser.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<SharedUser> sharedUserList = sharedUserRepository.findAll();
        assertThat(sharedUserList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
